import { StatusCodes } from 'http-status-codes';
import orderRepairsService from '../services/order-repairs.service.js';

const getAll = async (req, res) => {
    try {

        const query = req.query ?? { page: 1, limit: 10, searchText: '' };

        const orderRepairs = await orderRepairsService.getAll(query);

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

        const exists = await orderRepairsService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Orden reparación no encontrado' });
        }

        const orderRepairUpdated = await orderRepairsService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(orderRepairUpdated);

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
    destroy,
};
