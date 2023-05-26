import Device from '../models/device.model.js';
import slugify from 'slugify';

/**
 * Get All Devices filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<Device>>} A paginate respond of Device data
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

    return Device.paginate(filters, {
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
 * Find a device by slug field
 * @param {string} slug indentifier string name
 * @returns {Promise<Device>} device found
 */
const getBySlug = slug => {
    return Device.findOne({ slug });
};

/**
 * Find a device by _id field
 * @param {string} _id 
 * @returns {Promise<Device>} device found
 */
const getById = _id => {
    return Device.findById(_id)
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
 * Create a new device
 * @param {object<Device>} device object with fields of device schema
 * @returns {Promise<Device>} new device created
 */
const create = device => {
    const newDevice = new Device(device);
    return newDevice.save();
};

/**
 * Update a device
 * @param {string} _id indentifier from device to update
 * @param {Device} device object with fields to update of device register
 * @returns {Promise<Device>} device updated
 */
const update = (_id, device) => {
    return Device.findOneAndUpdate({ _id }, device, { new: true });
};

/**
 * Soft delete of device by _id
 * @param {string} _id indentifier from device to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return Device.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    destroy,
};
