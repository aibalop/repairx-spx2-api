import { check } from 'express-validator';

export const devicesSetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerido')
];
