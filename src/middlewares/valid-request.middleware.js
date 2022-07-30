import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validRequest = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Datos de entrada incorrectos',
            details: error.errors.map(error => error.msg),
        });
    }
};

export default validRequest;
