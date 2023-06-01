import { check } from 'express-validator';

export const companySetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerido'),
    check('phone').optional({ checkFalsy: true }).isLength(10).withMessage('Teléfono debe tener 10 dígitos'),
    check('email').not().isEmpty().withMessage('Email es requerida'),
    check('email').isEmail().withMessage('Email no valido'),
];
