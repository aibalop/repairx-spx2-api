import mongoose from 'mongoose';
import slugify from 'slugify';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const chargeSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Nombre del cargo es requerido'], uppercase: true },
    slug: { type: String, required: [true, 'Slug es requerido'], lowercase: true, index: true },
    description: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'charges'
});

chargeSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
chargeSchema.plugin(paginate);

chargeSchema.pre('validate', async function (next) {

    const slugName = slugify(this.get('name'), { lower: true });

    const slugExists = await this.collection.findOne({ slug: slugName, deleted: false });

    if (slugExists) {
        next(new Error('Ya existe un cargo con ese nombre'));
    } else {
        this.set('slug', slugName);
        next();
    }

});

const Charge = mongoose.model('Charge', chargeSchema);

export default Charge;
