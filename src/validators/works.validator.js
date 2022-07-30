import { check } from 'express-validator';

export const worksSetValidators = [
    check('key').not().isEmpty().withMessage('Clave es requerida'),
    check('name').not().isEmpty().withMessage('Nombre es requerido')
];
