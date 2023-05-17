import { StatusCodes } from 'http-status-codes';
import jwtUtil from '../utils/jwt.util.js';

const jwtRequired = (req, res, next) => {
    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || authorizationHeader.split(' ')[0] !== 'Bearer') {
            throw new Error('Authorización por Bearer token no valida o ausente');
        }

        const token = authorizationHeader.substring('Bearer '.length, authorizationHeader.length)

        const decode = jwtUtil.verify(token);

        req.payload = decode;

        if (req.method === 'POST') {
            req.body.createdBy = decode._id;
            req.body.companyId = decode.companyId._id;
        }

        if (req.method === 'PUT' || req.method === 'PATCH') {
            req.body.updatedBy = decode._id;
        }

        next();

    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
};

export default jwtRequired;