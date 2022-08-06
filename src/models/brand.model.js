import mongoose from 'mongoose';
import slugify from 'slugify';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const brandSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: [true, 'Nombre de la marca es requerido'], uppercase: true },
    slug: { type: String, required: [true, 'Slug es requerido'], lowercase: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'brands'
});

brandSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
brandSchema.plugin(paginate);

brandSchema.pre('validate', async function (next) {

    const slugName = slugify(this.get('name'), { lower: true });

    const slugExists = await this.collection.findOne({ slug: slugName, deleted: false });

    if (slugExists) {
        next(new Error('Ya existe una marca con ese nombre'));
    } else {
        this.set('slug', slugName);
        next();
    }

});

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
