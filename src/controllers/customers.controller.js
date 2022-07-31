import { StatusCodes } from 'http-status-codes';
import slugify from 'slugify';
import customersService from '../services/customers.service.js';

const getAll = async (req, res) => {
    try {

        const query = req.query ?? { page: 1, limit: 10, searchText: '' };

        const customers = await customersService.getAll(query);

        res.status(StatusCodes.OK).json(customers);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const getById = async (req, res) => {
    try {

        const customer = await customersService.getById(req.params._id);

        if (!customer) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente no encontrado' });
        }

        res.status(StatusCodes.OK).json(customer);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const create = async (req, res) => {
    try {

        const newCustomer = await customersService.create(req.body);

        res.status(StatusCodes.CREATED).json(newCustomer);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const update = async (req, res) => {
    try {

        const customerId = req.params._id;

        const exists = await customersService.getById(customerId);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente no encontrado' });
        }

        const { name, lastName, surName, email, phone } = req.body;

        if (name && lastName) {
            req.body.slug = slugify(slugify(`${name} ${lastName} ${surName ?? ''}`));;
        }

        if (email) {
            const existsEmail = await customersService.getByEmail(email);

            if (existsEmail && existsEmail._id.toString() !== customerId) {
                throw new Error(`Ya existe el email: ${email}`);
            }
        }

        if (phone) {
            const existsPhone = await customersService.getByPhone(phone);

            if (existsPhone && existsPhone._id.toString() !== customerId) {
                throw new Error(`Ya existe el teléfono: ${phone}`);
            }
        }

        const customerUpdated = await customersService.update(customerId, req.body);

        res.status(StatusCodes.OK).json(customerUpdated);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.toString() });
    }
};

const destroy = async (req, res) => {
    try {

        const exists = await customersService.getById(req.params._id);

        if (!exists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente no encontrado' });
        }

        await customersService.destroy(req.params._id, req.payload._id);

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
