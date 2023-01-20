import OrderRepair from '../models/order-repair.model.js';

/**
 * Get All Order Repairs filters by a query and respond with a paginate response
 * @param {object} query Object of params to use like filters
 * @returns {Promise<Paginate<OrderRepair>>} A paginate respond of Order Repair data
 */
const getAll = query => {
    const filters = {};

    if (query.searchText) {
        const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        const cleanName = query.searchText.trim().replace(invalid, "");
        filters['$or'] = [
            { orderId: { $regex: new RegExp(cleanName), $options: 'i' } },
        ];
    }

    return OrderRepair.paginate(filters, {
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
 * Find a Order Repair by orderId field
 * @param {string} orderId indentifier of order
 * @returns {Promise<OrderRepair>} Order Repair found
 */
const getByOrderId = orderId => {
    return OrderRepair.findOneWithDeleted({ orderId });
};

/**
 * Find a order repair by _id field
 * @param {string} _id 
 * @returns {Promise<OrderRepair>} order repair found
 */
const getById = _id => {
    return OrderRepair.findById(_id)
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
 * Create a new order repair
 * @param {object<OrderRepair>} OrderRepair object with fields of order repair schema
 * @returns {Promise<OrderRepair>} new prder repair created
 */
const create = orderRepair => {
    const newOrderRepair = new OrderRepair(orderRepair);
    return newOrderRepair.save();
};

/**
 * Update a order repair
 * @param {string} _id indentifier from order repair to update
 * @param {OrderRepair} orderRepair object with fields to update of order repair register
 * @returns {Promise<{
 * acknowledged: boolean, modifiedCount: number, upsertedId: string, upsertedCount: number, matchedCount: number
 * }>} object updated
 */
const update = (_id, orderRepair) => {
    return OrderRepair.updateOne({ _id }, { $set: orderRepair });
};

/**
 * Update a device status in at order repair
 * @param {string} _id indentifier from order repair to update
 * @param {number} index position in array of devices
 * @param {string} status status value to update
 * @returns {Promise<{
 * acknowledged: boolean, modifiedCount: number, upsertedId: string, upsertedCount: number, matchedCount: number
 * }>} object updated
 */
const updateStatusDevice = (_id, index, status) => {
    const fieldToUpdate = `devices.${index}.status`;
    return OrderRepair.updateOne({ _id, [fieldToUpdate]: { $exists: true } }, { $set: { [fieldToUpdate]: status } });
};

/**
 * Soft delete of order repáir by _id
 * @param {string} _id indentifier from order repair to destroy
 * @param {string} userId _id from user who destroy the register
 * @returns {Promise<any>} object with deleted info
 */
const destroy = (_id, userId) => {
    return OrderRepair.delete({ _id }, userId);
};

export default {
    getAll,
    getById,
    getByOrderId,
    create,
    update,
    updateStatusDevice,
    destroy,
};
