import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

const config = {
    api: {
        name: process.env.APP_NAME,
        author: process.env.APP_AUTHOR,
        port: process.env.APP_PORT,
        secretKey: process.env.APP_SECRET_KEY,
    },
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};

export default config;
