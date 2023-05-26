import { StatusCodes } from 'http-status-codes';
import orderRepairsService from '../services/order-repairs.service.js';
import pdfUtil from '../utils/pdf.util.js';
import formatUtil from '../utils/format.util.js';

const getAll = async (req, res) => {
    try {

        const orderRepairs = await orderRepairsService.getAll(req.query);

        res.status(StatusCodes.OK).json(orderRepairs);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const orderRepair = await orderRepairsService.getById(req.params._id);

        if (!orderRepair) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden Reparación no encontrado' });
        }

        res.status(StatusCodes.OK).json(orderRepair);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getByOrderId = async (req, res) => {
    try {

        const orderRepair = await orderRepairsService.getByOrderId(req.params.orderId);

        if (!orderRepair) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden Reparación no encontrado' });
        }

        res.status(StatusCodes.OK).json(orderRepair);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getOrderRepairPDF = async (req, res) => {
    try {

        const orderRepair = await orderRepairsService.getByOrderId(req.params.orderId);

        if (!orderRepair) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden Reparación no encontrado' });
        }

        const data = orderRepair.toObject();

        data.devices = data.devices.map(device => {
            device.itsOn = device.itsOn ? 'Si' : 'No';
            return device;
        });
        data.createdAt = formatUtil.getFormattedDate(data.createdAt);
        data.deliveryDate = formatUtil.getFormattedDate(data.deliveryDate, false);
        data.customer.phone = formatUtil.getFormattedPhone(data.customer.phone);
        data.totalAmount = formatUtil.getFormattedAmount(data.totalAmount);
        data.advanceAmount = formatUtil.getFormattedAmount(data.advanceAmount);
        data.remainingAmount = formatUtil.getFormattedAmount(data.remainingAmount);

        const pdf = await pdfUtil.generatePDF('order-repair-created.html', data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdf.length)
        res.send(pdf);

    } catch (error) {
        
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newOrderRepair = await orderRepairsService.create(req.body);

        res.status(StatusCodes.CREATED).json(newOrderRepair);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const updated = await orderRepairsService.update(req.params._id, req.body);

        if (updated.matchedCount === 0 && updated.modifiedCount === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden de reparación no encontrada' });
        }

        res.status(StatusCodes.NO_CONTENT).json({});

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const updateStatusDevice = async (req, res) => {
    try {

        const { index, status } = req.body;

        const updated = await orderRepairsService.updateStatusDevice(req.params._id, index, status);

        if (updated.matchedCount === 0 && updated.modifiedCount === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'No se encontro una orden de reparación o dispositivo que actualizar'
            });
        }

        res.status(StatusCodes.NO_CONTENT).json({});

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await orderRepairsService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden reparación no encontrado' });
        }

        await orderRepairsService.destroy(req.params._id, req.payload._id);

        res.status(StatusCodes.NO_CONTENT).json();

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

export default {
    getAll,
    create,
    getById,
    update,
    updateStatusDevice,
    destroy,
    getByOrderId,
    getOrderRepairPDF,
};
