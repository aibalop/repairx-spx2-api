import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import slugify from 'slugify';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nombre es requerido'], uppercase: true, trim: true },
    lastName: { type: String, required: [true, 'Primer apellido es requerido'], uppercase: true, trim: true },
    surName: { type: String, uppercase: true, trim: true },
    slug: { type: String, require: [true, 'Slug es requerido'], lowercase: true, index: true },
    phone: { type: String, required: [true, 'Telefono es requerido'], index: true },
    email: { type: String, index: true, trim: true },
    address: {
        street: { type: String },
        num: { type: String },
        colony: { type: String },
        zip: { type: String },
        location: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'customers'
});

customerSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: true });

customerSchema.pre('save', async function (next) {

    const slugName = slugify(`${this.get('name')} ${this.get('lastName')} ${this.get('surName') ?? ''}`);

    this.set('slug', slugName);

});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
