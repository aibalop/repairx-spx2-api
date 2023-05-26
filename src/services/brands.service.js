import Brand from '../models/brand.model.js';
import slugify from 'slugify';

/**
 * Get All Brands filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Brand>>} A paginate respond of Brand data
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

    return Brand.paginate(filters, {
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
 * Find a brand by slug field
 * @param {string} slug indentifier string name
 * @returns {Promise<Brand>} brand found
 */
const getBySlug = slug => {
    return Brand.findOne({ slug });
};

/**
 * Find a brand by _id field
 * @param {string} _id 
 * @returns {Promise<Brand>} brand found
 */
const getById = _id => {
    return Brand.findById(_id)
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
 * Create a new brand
 * @param {object<Brand>} brand object with fields of brand schema
 * @returns {Promise<Brand>} new brand created
 */
const create = brand => {
    const newBrand = new Brand(brand);
    return newBrand.save();
};

/**
 * Update a brand
 * @param {string} _id indentifier from brand to update
 * @param {Brand} brand object with fields to update of brand register
 * @returns {Promise<Brand>} brand updated
 */
const update = (_id, brand) => {
    return Brand.findOneAndUpdate({ _id }, brand, { new: true });
};

/**
 * Soft delete of brand by _id
 * @param {string} _id indentifier from brand to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return Brand.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    destroy,
};
