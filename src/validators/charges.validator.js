import { check } from 'express-validator';

export const chargesSetValidators = [
    check('name').not().isEmpty().withMessage('Nombre es requerido'),
    check('companyId').not().isEmpty().withMessage('Asignación de empresa es requerida'),
];
