import Company from '../models/company.model.js';
import slugify from 'slugify';

/**
 * Get All companies filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Company>>} A paginate respond of companies data
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

    return Company.paginate(filters, {
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
 * Find a company by _id field
 * @param {string} _id 
 * @returns {Promise<Company>} Company found
 */
const getById = _id => {
    return Company.findById(_id)
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
 * Create a new company
 * @param {object<Company>} Object with fields of company schema
 * @returns {Promise<Company>} new company created
 */
const create = company => {
    const newCompany = new Company(company);
    return newCompany.save();
};

/**
 * Update a Company
 * @param {string} _id indentifier from company to update
 * @param {Company} Object with fields to update of company register
 * @returns {Promise<Company>} Company updated
 */
const update = (_id, company) => {
    return Company.findOneAndUpdate({ _id }, company, { new: true });
};

/**
 * Delete of Company by _id
 * @param {string} _id indentifier from company to destroy
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id) => {
    return Company.deleteOne({ _id });
};

export default {
    getAll,
    getById,
    create,
    update,
    destroy,
};
