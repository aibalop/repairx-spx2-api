import { check } from 'express-validator';

export const userSetValidators = [
    check('user.name').not().isEmpty().withMessage('Nombre es requerida'),
    check('user.lastName').not().isEmpty().withMessage('Apellido es requerida'),
    check('user.username').not().isEmpty().withMessage('Nombre de usuario es requerido'),
    check('user.email').not().isEmpty().withMessage('Email es requerida'),
    check('user.email').isEmail().withMessage('Email no valido'),

    check('company.name').not().isEmpty().withMessage('Nombre es requerido'),
    check('company.phone').optional({ checkFalsy: true }).isLength(10).withMessage('Teléfono debe tener 10 dígitos'),
    check('company.email').not().isEmpty().withMessage('Email es requerida'),
    check('company.email').isEmail().withMessage('Email no valido'),
];
