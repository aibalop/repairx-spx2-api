import { check } from 'express-validator';

export const changePasswordSetValidators = [
    check('username').not().isEmpty().withMessage('Nombre de usuario es requerido'),
    check('currentPassword').not().isEmpty().withMessage('Contraseña actual es requerida'),
    check('newPassword').not().isEmpty().withMessage('Contraseña nueva es requerida'),
];
