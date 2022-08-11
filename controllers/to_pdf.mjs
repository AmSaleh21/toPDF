import html_to_pdf from 'html-pdf-node';
import {write, read} from '../services/fs.mjs'
import fs from "fs";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILES_PATH = path.join(__dirname, '..', 'files/');

/**
 *
 * @param req expects json with options, file with optional name { options, file, <name>}
 * @param res respond with the buffer to download the pdf {status, message}
 * @param next for error middleware
 */
export const generateBuffer = (req, res, next) => {
    try {
        let options = req.body.options;
        let content = req.body.file;
        let pdfName;
        req.body.name ? pdfName = req.body.name : pdfName = Date.now() + '.pdf';
        let buffer = '';
        let status = {message: "", name: ""}

        console.log('before generate');

        html_to_pdf.generatePdf(content, options)
            .then(pdfBuffer => {
                buffer = pdfBuffer;
                fs.writeFile(path.join(FILES_PATH, pdfName), buffer, writeError => {
                    res.status(500)
                    status.message = 'error writing file'
                    status.error = writeError
                });
                res.status(201)
                status.message = 'file written'
                status.name = pdfName
            }).then(() => {
                res.json(status)
        })
    } catch (error) {
        next(error);
    }
};

/**
 *
 * @param req expects param name
 * @param res sends {status, message} or pdf file
 * @param next
 */
export const getAndSend = (req, res, next) => {
    try {
        let fileName = req.params.name;
        console.log(fileName)

        read(fileName, buffer => {
            buffer &&  write(buffer.message, fileName, ({status, message, filePath}) => {
                res.status(200);
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
                res.send(message)
            });
        });
    }catch (error) {
        next(error)
    }
}
