import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import devicesService from '../services/devices.service.js';

const getAll = async (req, res) => {
    try {

        const query = req.query ?? { page: 1, limit: 10, searchText: '' };

        const devices = await devicesService.getAll(query);

        res.status(StatusCodes.OK).json(devices);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const device = await devicesService.getById(req.params._id);

        if (!device) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Dispositivo no encontrado' });
        }

        res.status(StatusCodes.OK).json(device);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newDevice = await devicesService.create(req.body);

        res.status(StatusCodes.CREATED).json(newDevice);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const exists = await devicesService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Dispositivo no encontrado' });
        }

        const { name } = req.body.name;

        if (name) {
            const slug = slugify(name);

            const exists = await devicesService.getBySlug(slug);

            if (exists && exists._id.toString() !== req.params._id) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: `El nombre del dispositivo ya existe: ${name}` });
            }

            req.body.slug = slug;
        }

        const deviceUpdated = await devicesService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(deviceUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await devicesService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Dispositivo no encontrado' });
        }

        await devicesService.destroy(req.params._id, req.payload._id);

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
