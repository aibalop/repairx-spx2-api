import mongoose from 'mongoose';
import slugify from 'slugify';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nombre es requerido'],
      uppercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Primer apellido es requerido'],
      uppercase: true,
      trim: true,
    },
    surName: { type: String, uppercase: true, trim: true },
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
    email: { type: String, index: true, trim: true },
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
    collection: 'customers',
  }
);

customerSchema.plugin(softDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});
customerSchema.plugin(paginate);

customerSchema.pre('validate', async function (next) {
  const slugName = slugify(
    `${this.get('name')} ${this.get('lastName')} ${this.get('surName') ?? ''}`,
    { lower: true }
  );

  const email = this.get('email');
  const phone = this.get('phone');

  if (email) {
    const existsEmail = await this.collection.findOne({
      email,
      deleted: false,
    });

    if (existsEmail) {
      next(new Error(`Ya existe el email: ${email}`));
    }
  }

  if (phone) {
    const existsPhone = await this.collection.findOne({
      phone,
      deleted: false,
    });

    if (existsPhone) {
      next(new Error(`Ya existe el teléfono: ${phone}`));
    }
  }

  this.set('slug', slugName);
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
