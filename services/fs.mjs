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
 * @returns {{message: string, status: boolean}}
 */
export const write = (buffer, fileName) => {
    try {
        const pdfName = fileName ? fileName : Date.now() + '.pdf';
        fs.writeFile(path.join(FILES_PATH, pdfName), buffer, writeError => {
            return {status: false, message: 'failed to write file' + writeError};
        });
        return {status: true, message: 'File written'};
    } catch (error) {
        throw error;
    }
};

/**
 * @description read pdf file from storage
 * @param fileName file to get from storage
 * @returns {Promise<void>}
 */
export const read = async fileName => {
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
            console.log('promise then', data)
        })
    } catch (error) {
        throw error;
    }
};
