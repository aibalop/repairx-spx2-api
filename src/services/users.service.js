import User from '../models/user.model.js';

/**
 * Create a user
 * @param {Object<User>} user data to create user 
 * @returns {Object<User>} created user
 */
const create = user => {
    const newUser = new User(user);
    return newUser.save();
};

/**
 * Find a user by username
 * @param {string} username username unique to the user
 * @returns {Object<User>} user object
 */
const getByUsername = username => {
    return User.findOne({ username });
};

/**
 * Get all users
 * @param {Object} query filters to find users
 * @returns {Array<Object<User>>} array of users
 */
const getAll = query => {
    const filters = {};

    if (query?.ignoreId) {
        filters['_id'] = { $ne: query.ignoreId };
    }

    return User.find(filters);
};

/**
 * Update a user
 * @param {string} _id indentifier from user to update
 * @param {Object<User>} user object with fields to update of user
 * @returns {Promise<{
* acknowledged: boolean, modifiedCount: number, upsertedId: string, upsertedCount: number, matchedCount: number
* }>} object updated
*/
const update = (_id, user) => {
    return User.updateOne({ _id }, { $set: user });
};

export default {
    create,
    getByUsername,
    getAll,
    update,
};
