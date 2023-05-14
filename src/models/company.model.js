import mongoose from 'mongoose';
import slugify from 'slugify';
import paginate from 'mongoose-paginate-v2';

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nombre de la empresa es requerido'],
            uppercase: true,
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Slug es requerido'],
            lowercase: true,
            index: true,
        },
        phone: {
            type: String,
            required: [true, 'Telefono es requerido'],
            index: true,
        },
        email: {
            type: String,
            required: [true, 'Email es requerido'],
            index: true,
            trim: true,
        },
        address: {
            street: { type: String },
            num: { type: String },
            interiorNum: { type: String },
            colony: { type: String },
            zip: { type: String },
            location: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String },
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        collection: 'companies',
    }
);

companySchema.plugin(paginate);

companySchema.pre('validate', async function (next) {
    this.set('slug', slugify(this.get('name'), { lower: true }));
});

const Company = mongoose.model('Company', companySchema);

export default Company;
