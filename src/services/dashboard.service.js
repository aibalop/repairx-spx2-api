import Customer from '../models/customer.model.js';
import OrderRepair from '../models/order-repair.model.js';

/**
 * Get the revenue of the orders repairs in that range of dates.
 * @param {Object} filters data filter object
 * @returns {Number} revenue
 */
const getRevenue = async (filters) => {

    const [resultQuery = { revenue: 0 }] = await OrderRepair.aggregate([
        {
            $match: filters,
        },
        {
            $group: {
                _id: null,
                revenue: { $sum: '$totalAmount' },
            },
        },
    ]);

    return Promise.resolve(resultQuery.revenue);

};

/**
 * Get the total number of orders repairs in that range of dates.
 * @param {Object} filters data filter object
 * @returns {Number} total number of orders
 */
const getTotalOrderRepairs = async (filters) => {

    const [resultQuery = { orderRepairsFound: 0 }] = await OrderRepair.aggregate([
        {
            $match: filters,
        },
        {
            $count: 'orderRepairsFound',
        },
    ]);

    return Promise.resolve(resultQuery.orderRepairsFound);

};

/**
 * Get the total number of new customers in that range of dates.
 * @param {Object} filters data filter object
 * @returns {Number} total number of new customers
 */
const getTotalOfCustomers = async (filters) => {

    const [resultQuery = { customersFound: 0 }] = await Customer.aggregate([
        {
            $match: filters,
        },
        {
            $count: 'customersFound',
        },
    ]);

    return Promise.resolve(resultQuery.customersFound);

};

export default {
    getRevenue,
    getTotalOrderRepairs,
    getTotalOfCustomers,
};
