import mongoose from 'mongoose';
import slugify from 'slugify';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const deviceSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Nombre del dispositivo es requerido'], uppercase: true },
    slug: { type: String, required: [true, 'Slug es requerido'], lowercase: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'devices'
});

deviceSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
deviceSchema.plugin(paginate);

deviceSchema.pre('save', async function (next) {

    const slugName = slugify(this.get('name'), { lower: true });

    const slugExists = await this.collection.findOne({ slug: slugName, deleted: false });

    if (slugExists) {
        next(new Error('Ya existe un dispositivo con ese nombre'));
    } else {
        this.set('slug', slugName);
        next();
    }

});

const Device = mongoose.model('Device', deviceSchema);

export default Device;
