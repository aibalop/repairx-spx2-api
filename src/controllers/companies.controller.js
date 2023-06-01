import { StatusCodes } from 'http-status-codes';
import companiesService from '../services/companies.service.js';
import slugify from 'slugify';

const getById = async (req, res) => {
    try {

        const company = await companiesService.getById(req.params._id);

        if (!company) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Empresa no encontrada' });
        }

        res.status(StatusCodes.OK).json(company);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const exists = await companiesService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Empresa no encontrada' });
        }

        const { name } = req.body;

        if (name) {
            req.body.slug = slugify(name);
        }

        const companyUpdated = await companiesService.update(req.params._id, req.body);

        res.status(StatusCodes.OK).json(companyUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

export default {
    getById,
    update,
};
