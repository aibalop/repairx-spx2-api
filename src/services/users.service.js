import User from '../models/user.model.js';

const create = user => {
    const newUser = new User(user);
    return newUser.save();
};

const getByUsername = username => {
    return User.findOne({ username });
};

const getAll = query => {
    const filters = {};

    if (query?.ignoreId) {
        filters['_id'] = { $ne: query.ignoreId };
    }

    return User.find(filters);
};

export default {
    create,
    getByUsername,
    getAll,
};
