import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILES_PATH = path.join(__dirname, '..', 'files/');

/**
 * @description write buffer to pdf file
 * @param buffer pdf buffer
 * @param fileName fileName pdf name, default date if not provided
 * @returns {Promise<{message: string, status: boolean}>}
 */
export const write = (buffer, fileName, cb) => {
    try {
        const pdfName = fileName ? `${fileName}.pdf` : Date.now() + '.pdf';
        const filePath = path.join(FILES_PATH, pdfName);

        fs.writeFile(filePath, buffer, writeError => {
            if (writeError){
                return {status: false, message: 'failed to write file' + writeError};
            }
            return cb({status: true, message: 'File written', filePath});
        });
    } catch (error) {
        throw error;
    }
};

/**
 * @description read pdf file from storage
 * @param fileName file to get from storage
 * @returns {Promise<void>}
 */
export const read = (fileName, getBuffer) => {
    try {
        let data = {};
        fs.readFile(path.join(FILES_PATH, fileName), (readError, readData) => {
            if (!readError && readData) {
                console.log('found');
                data = {status: true, message: readData};
            } else {
                console.log('not found');
                data = {status: false, message: readError};
            }
            console.log('promise then', data);
            return getBuffer(data);
        })
    } catch (error) {
        throw error;
    }
};
