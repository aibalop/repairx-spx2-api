import mongoose from 'mongoose';
import slugify from 'slugify';
import mongoose_delete from 'mongoose-delete';

const chargeSchema = new mongoose.Schema({
    name: { type: String, trim: true, require: [true, 'Nombre del cargo es requerido'], uppercase: true },
    slug: { type: String, require: [true, 'Slug es requerido'], index: true },
    description: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'charges'
});

chargeSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true, overrideMethods: true });

chargeSchema.pre('save', async function (next) {

    const slugName = slugify(this.get('name'));

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
