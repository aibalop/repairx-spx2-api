import Charge from '../models/charge.model.js';
import slugify from 'slugify';

/**
 * Get All Charges filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Charge>>} A paginate respond of Charge data
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
        ];
    }

    if (query.companyId) {
        filters['companyId'] = query.companyId;
    }

    return Charge.paginate(filters, {
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
 * Find a charge by slug field
 * @param {string} slug indentifier string name
 * @returns {Promise<Charge>} charge found
 */
const getBySlug = slug => {
    return Charge.findOne({ slug });
};

/**
 * Find a charge by _id field
 * @param {string} _id 
 * @returns {Promise<Charge>} charge found
 */
const getById = _id => {
    return Charge.findById(_id)
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
 * Create a new charge
 * @param {object<charge>} charge object with fields of charge schema
 * @returns {Promise<charge>} new charge created
 */
const create = charge => {
    const newCharge = new Charge(charge);
    return newCharge.save();
};

/**
 * Update a charge
 * @param {string} _id indentifier from charge to update
 * @param {Charge} charge object with fields to update of charger register
 * @returns {Promise<Charge>} charge updated
 */
const update = (_id, charge) => {
    return Charge.findOneAndUpdate({ _id }, charge, { new: true });
};

/**
 * Soft delete of charge by _id
 * @param {string} _id indentifier from charge to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return Charge.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    destroy,
};
