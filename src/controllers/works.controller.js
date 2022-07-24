import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import worksService from '../services/works.service.js';

const getAll = async (req, res) => {
    try {

        const query = req.query ?? { page: 1, limit: 10, searchText: '' };

        const works = await worksService.getAll(query);

        res.status(StatusCodes.OK).json(works);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const work = await worksService.getById(req.params._id);

        if (!work) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Servicio no encontrado' });
        }

        res.status(StatusCodes.OK).json(work);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newWork = await worksService.create(req.body);

        res.status(StatusCodes.CREATED).json(newWork);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const exists = await worksService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Servicio no encontrado' });
        }

        if (req.body.name) {
            const slug = slugify(req.body.name);

            const exists = await worksService.getBySlug(slug);

            if (exists && exists._id.toString() !== req.params._id) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: `El nombre del servicio ya existe: ${req.body.name}` });
            }

            req.body.slug = slug;
        }

        const workUpdated = await worksService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(workUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await worksService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Servicio no encontrado' });
        }

        await worksService.destroy(req.params._id, req.payload._id);

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
