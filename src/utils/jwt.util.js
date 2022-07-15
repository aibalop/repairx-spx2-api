import jsonwebtoken from 'jsonwebtoken';
import config from './config.util.js';

const sign = (payload) => {
    return jsonwebtoken.sign(payload, config.api.secretKey);
};

const verify = (token) => {
    try {
        return jsonwebtoken.verify(token, config.api.secretKey);
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            throw new Error('El token expiro');
        }

        if (error.name === "JsonWebTokenError") {

            console.log('Error: ', error.message);

            switch (error.message) {
                case 'jwt malformed':
                    throw new Error('JWT malformado');
                case 'jwt signature is required':
                    throw new Error('JWT firma es requerida');
                case 'invalid signature':
                    throw new Error('Firma invalida');
                case 'jwt audience invalid. expected: [OPTIONS AUDIENCE]':
                    throw new Error('JWT audiencia invaida');
                case 'jwt issuer invalid. expected: [OPTIONS ISSUER]':
                    throw new Error('JWT emisora invalida');
                case 'jwt id invalid. expected: [OPTIONS JWT ID]':
                    throw new Error('JWT ID invalido');
                case 'jwt subject invalid. expected: [OPTIONS SUBJECT]':
                    throw new Error('JWT asunto invalido');
                default:
                    throw new Error('JWT no se pudo verificar');
            }

        }

        if (error.name === 'NotBeforeError') {
            throw new Error('JWT no activo')
        }

    }
};

export default {
    sign, verify,
};
