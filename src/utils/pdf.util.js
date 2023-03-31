import * as pdf from 'pdf-creator-node';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const optionsDefault = {
    format: 'A3',
    orientation: 'portrait',
    border: '5mm',
};

/**
 * Generate a pdf stream from a template file
 * @param {string} template name of the template
 * @param {object} data data to render in template
 * @param {object} options options to pass to template generator (optional)
 * @param {string} type type of output pdf format for example: ''=file, 'stream' and 'buffer' (optional)
 * @return {Stream} stream of pdf
 */
const generatePDF = (template, data, options = {}, type = 'stream') => {

    const templatePath = join(__dirname, '..', 'templates', template);

    const html = readFileSync(templatePath, 'utf-8');

    const document = {
        html,
        data,
        type,
    };

    return pdf.create(document, { ...optionsDefault, ...options });

};

export default {
    generatePDF,
};
