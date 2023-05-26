import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import chargesService from '../services/charges.service.js';

const getAll = async (req, res) => {
    try {

        const charges = await chargesService.getAll(req.query);

        res.status(StatusCodes.OK).json(charges);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const charge = await chargesService.getById(req.params._id);

        if (!charge) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cargo no encontrado' });
        }

        res.status(StatusCodes.OK).json(charge);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newCharge = await chargesService.create(req.body);

        res.status(StatusCodes.CREATED).json(newCharge);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const exists = await chargesService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cargo no encontrado' });
        }

        const { name } = req.body;

        if (name) {
            const slug = slugify(name);

            const exists = await chargesService.getBySlug(slug);

            if (exists && exists._id.toString() !== req.params._id) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: `El nombre del cargo ya existe: ${name}` });
            }

            req.body.slug = slug;
        }

        const chargeUpdated = await chargesService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(chargeUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await chargesService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cargo no encontrado' });
        }

        await chargesService.destroy(req.params._id, req.payload._id);

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
