import { check } from 'express-validator';

export const orderRepairsSetValidators = [
    check('customer').not().isEmpty().withMessage('Datos del cliente son requeridos'),
    check('works').not().isEmpty().withMessage('Datos de los servicios son requeridos'),
    check('charges').not().isEmpty().withMessage('Datos de los cargos son requeridos'),
    check('devices').not().isEmpty().withMessage('Datos de los dispositivos son requeridos'),
    check('discountAmount').not().isEmpty().withMessage('Descuento es requerido'),
    check('discountAmount').isNumeric().withMessage('Descuento debe ser un valor numerico'),
    check('advanceAmount').not().isEmpty().withMessage('Anticipo es requerido'),
    check('advanceAmount').isNumeric().withMessage('Anticipo debe ser un valor numerico'),
    check('subtotalAmount').not().isEmpty().withMessage('Subtotal es requerido'),
    check('subtotalAmount').isNumeric().withMessage('Subtotal debe ser un valor numerico'),
    check('totalAmount').not().isEmpty().withMessage('Total es requerido'),
    check('totalAmount').isNumeric().withMessage('Total debe ser un valor numerico'),
];

export const orderRepairUpdateSetValidators = [
    check('isPaid').isBoolean().withMessage('Bandera de pagado debe ser booleano'),
    check('remainingAmount').isNumeric().withMessage('Cantidad restante debe ser un valor numerico'),
    check('paidAt').isISO8601().withMessage('Fecha de pago debe tener formato de fecha ISO'),
];
