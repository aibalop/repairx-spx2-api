import mongoose from 'mongoose';
import slugify from 'slugify';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const workSchema = new mongoose.Schema({
    key: { type: String, trim: true, required: [true, 'Clave de servicio es requerida'], index: true },
    name: { type: String, trim: true, required: [true, 'Nombre del servicio es requerido'], uppercase: true },
    slug: { type: String, required: [true, 'Slug es requerido'], lowercase: true, index: true },
    description: { type: String, trim: true },
    amount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'works'
});

workSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
workSchema.plugin(paginate);

workSchema.pre('save', async function (next) {

    const keyExists = await this.collection.findOne({ key: this.get('key'), deleted: false });

    if (keyExists) {

        next(new Error('Ya existe un servicio con esa clave'));

    } else {

        const slugName = slugify(this.get('name'), { lower: true });

        const slugExists = await this.collection.findOne({ slug: slugName, deleted: false });

        if (slugExists) {
            next(new Error('Ya existe un servicio con ese nombre'));
        } else {
            this.set('slug', slugName);
            next();
        }

    }
});

const Work = mongoose.model('Work', workSchema);

export default Work;
