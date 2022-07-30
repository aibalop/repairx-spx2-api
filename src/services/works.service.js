import Work from '../models/work.model.js';
import slugify from 'slugify';

/**
 * Get All Works filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Work>>} A paginate respond of Work data
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
            { key: { $regex: new RegExp(cleanName), $options: 'i' } },
        ];
    }

    return Work.paginate(filters, {
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
 * Find a work by slug field
 * @param {string} slug indentifier string name
 * @returns {Promise<Work>} work found
 */
const getBySlug = slug => {
    return Work.findOne({ slug });
};

/**
 * Find a work by key field
 * @param {string} key indentifier string name
 * @returns {Promise<Work>} work found
 */
 const getByKey = key => {
    return Work.findOne({ key });
};

/**
 * Find a work by _id field
 * @param {string} _id 
 * @returns {Promise<Work>} work found
 */
const getById = _id => {
    return Work.findById(_id)
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
 * Create a new work
 * @param {object<Work>} work object with fields of work schema
 * @returns {Promise<Work>} new work created
 */
const create = work => {
    const newWork = new Work(work);
    return newWork.save();
};

/**
 * Update a work
 * @param {string} _id indentifier from work to update
 * @param {Work} work object with fields to update of work register
 * @returns {Promise<Work>} work updated
 */
const update = (_id, work) => {
    return Work.findOneAndUpdate({ _id }, work, { new: true });
};

/**
 * Soft delete of work by _id
 * @param {string} _id indentifier from work to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return Work.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getBySlug,
    getByKey,
    create,
    update,
    destroy,
};
