import { check } from 'express-validator';

export const userSetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerida'),
    check('lastName').not().isEmpty().withMessage('Apellido es requerida'),
    check('username').not().isEmpty().withMessage('Nombre de usuario es requerido'),
    check('email').not().isEmpty().withMessage('Email es requerida'),
    check('email').isEmail().withMessage('Email no valido'),
];
