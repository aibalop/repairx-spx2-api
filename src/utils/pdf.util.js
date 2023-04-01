import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as puppeteer from "puppeteer";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate a pdf buffer from a template file
 * @param {string} template name of the template
 * @param {object} data data to render in template
 * @return {buffer} stream of pdf
 */
const generatePDF = async (template, data = {}) => {

    const templatePath = join(__dirname, '..', 'templates', template);

    const htmlTemplate = readFileSync(templatePath, 'utf-8');

    const templateCompile = Handlebars.compile(htmlTemplate);

    const html = templateCompile(JSON.parse(JSON.stringify(data)));

    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'domcontentloaded',
    })

    const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
            bottom: '15px',
            left: '15px',
            right: '15px',
            top: '15px',
        }
    })

    await browser.close();

    return pdfBuffer;

};

export default {
    generatePDF,
};
