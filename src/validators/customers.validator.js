import { check } from 'express-validator';

export const customersSetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerido'),
    check('lastName').not().isEmpty().withMessage('Primer apellido es requerido'),
    check('phone').optional({ checkFalsy: true }).isLength(10).withMessage('Teléfono debe tener 10 dígitos'),
    check('email').optional({ checkFalsy: true }).isEmail().withMessage('Email no valido'),
    check('companyId').not().isEmpty().withMessage('Asignación de empresa es requerida'),
];
