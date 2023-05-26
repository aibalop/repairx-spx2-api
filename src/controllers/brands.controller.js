import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import brandsService from '../services/brands.service.js';

const getAll = async (req, res) => {
    try {

        const brands = await brandsService.getAll(req.query);

        res.status(StatusCodes.OK).json(brands);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const brand = await brandsService.getById(req.params._id);

        if (!brand) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Marca no encontrada' });
        }

        res.status(StatusCodes.OK).json(brand);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newBrand = await brandsService.create(req.body);

        res.status(StatusCodes.CREATED).json(newBrand);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const exists = await brandsService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Marca no encontrada' });
        }

        const { name } = req.body;

        if (name) {
            const slug = slugify(name);

            const exists = await brandsService.getBySlug(slug);

            if (exists && exists._id.toString() !== req.params._id) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: `El nombre de la marca ya existe: ${name}` });
            }

            req.body.slug = slug;
        }

        const brandUpdated = await brandsService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(brandUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await brandsService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Marca no encontrada' });
        }

        await brandsService.destroy(req.params._id, req.payload._id);

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
