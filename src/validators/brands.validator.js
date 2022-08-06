import { check } from 'express-validator';

export const brandsSetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerido')
];
