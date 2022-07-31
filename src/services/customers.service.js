import Customer from '../models/customer.model.js';
import slugify from 'slugify';

/**
 * Get All Customers filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Customer>>} A paginate respond of Customer data
 */
const getAll = query => {
    const filters = {};

    if (query.searchText) {
        const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        const cleanName = query.searchText.trim().replace(invalid, "");
        const slugName = slugify(query.searchText);
        filters['$or'] = [
            { slug: { $regex: new RegExp(cleanName), $options: 'i' } },
            { slug: { $regex: new RegExp(slugName), $options: 'i' } },
            { phone: { $regex: new RegExp(cleanName), $options: 'i' } },
            { email: { $regex: new RegExp(cleanName), $options: 'i' } },
        ];
    }

    return Customer.paginate(filters, {
        page: query.page,
        limit: query.limit,
        sort: { createdAt: -1 },
        customLabels: {
            totalDocs: 'count',
            docs: 'data',
        },
        populate: [
            {
                path: 'createdBy',
                select: '_id name lastName',
            },
            {
                path: 'updatedBy',
                select: '_id name lastName',
            },
        ]
    });
};

/**
 * Find a customer by slug field
 * @param {string} slug indentifier string name
 * @returns {Promise<Customer>} customer found
 */
const getBySlug = slug => {
    return Customer.findOne({ slug });
};

/**
 * Find a customer by phone field
 * @param {string} phone number phone of customer
 * @returns {Promise<Customer>} customer found
 */
const getByPhone = phone => {
    return Customer.findOne({ phone });
};

/**
 * Find a customer by email field
 * @param {string} email email of customer
 * @returns {Promise<Customer>} customer found
 */
const getByEmail = email => {
    return Customer.findOne({ email });
};

/**
 * Find a customer by _id field
 * @param {string} _id 
 * @returns {Promise<Customer>} customer found
 */
const getById = _id => {
    return Customer.findById(_id)
        .populate([
            {
                path: 'createdBy',
                select: '_id name lastName'
            },
            {
                path: 'updatedBy',
                select: '_id name lastName'
            },
        ]);
};

/**
 * Create a new customer
 * @param {object<Customer>} work object with fields of customer schema
 * @returns {Promise<Customer>} new customer created
 */
const create = customer => {
    const newCustomer = new Customer(customer);
    return newCustomer.save();
};

/**
 * Update a customer
 * @param {string} _id indentifier from customer to update
 * @param {Customer} customer object with fields to update of customer register
 * @returns {Promise<Customer>} customer updated
 */
const update = (_id, customer) => {
    return Customer.findOneAndUpdate({ _id }, customer, { new: true });
};

/**
 * Soft delete of customer by _id
 * @param {string} _id indentifier from customer to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return Customer.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getBySlug,
    getByPhone,
    getByEmail,
    create,
    update,
    destroy,
};
