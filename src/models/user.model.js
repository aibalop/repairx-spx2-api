import mongoose from 'mongoose';
import mongooseHidden from 'mongoose-hidden';
import hashUtil from '../utils/hash.util.js';

const ERROR_CODE_MONGO = 11000;

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nombre es requerido'] },
    lastName: { type: String, required: [true, 'Apellido es requerido'] },
    username: { type: String, required: [true, 'Username es requerido'], unique: true },
    email: { type: String, required: [true, 'email es requerido'], unique: true },
    password: { type: String, required: [true, 'Contraseña es requerida'] }
}, {
    timestamps: true,
    collection: 'users'
});

userSchema.plugin(mongooseHidden(), { hidden: { _id: false, password: true } });

// TODO add a pre find to validate the _id its a valid mongo _id

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashUtil.generate(this.password);
    }
    next();
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === ERROR_CODE_MONGO) {
        next(new Error('Duplicidad de nombre de usuario o email'));
    } else {
        next();
    }
});

userSchema.post('updateOne', function (error, res, next) {
    if (error.name === 'MongoServerError' && error.code === ERROR_CODE_MONGO) {
        next(new Error('Duplicidad de nombre de usuario o email'));
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

export default User;
