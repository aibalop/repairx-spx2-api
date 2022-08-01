import mongoose from 'mongoose';
import softDelete from 'mongoose-delete';
import paginate from 'mongoose-paginate-v2';

const orderRepairSchema = new mongoose.Schema({
    orderId: { type: String, required: [true, 'ORDER ID es requerido'] },
    customer: {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: [true, 'Cliente es requerido'] },
        name: { type: String },
        lastName: { type: String },
        surName: { type: String },
        phone: { type: String },
        email: { type: String },
    },
    works: [{
        workId: { type: mongoose.Schema.Types.ObjectId, ref: 'Work', required: [true, 'ID de servicio es requerido'] },
        name: { type: String, required: [true, 'Nombre de servicio es requerido'] },
        amount: { type: Number, required: [true, 'Monto de servicio es requerido'] },
        notes: { type: String }
    }],
    charges: [{
        chargeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Charge', required: [true, 'ID de cargo es requerido'] },
        name: { type: String, required: [true, 'Nombre de cargo es requerido'] },
        amount: { type: Number, required: [true, 'Monto de cargo es requerido'] },
        notes: { type: String }
    }],
    devices: [{
        name: { type: String, required: [true, 'El nombre de dispositivo es requerido'], uppercase: true, trim: true },
        brand: { type: String, required: [true, 'La marca es requerida'], uppercase: true, trim: true },
        model: { type: String, uppercase: true, trim: true },
        accessory: { type: String, required: [true, 'Capture el accesorio'], uppercase: true, trim: true },
        itsOn: { type: Boolean, default: false },
        cards: { type: String, enum: ['SIM', 'SD', 'SIM/SD'], uppercase: true, trim: true },
        password: { type: String },
        details: { type: String, required: [true, 'Capture detalles del dispositivo'], uppercase: true, trim: true },
        customerReport: { type: String, required: [true, 'Capture reporte del cliente'], uppercase: true, trim: true },
        finalDiagnosis: { type: String, uppercase: true, trim: true },
        warrantyDays: { type: Number, default: 0 },
        status: { type: String, enum: ['Pendiente', 'En Progreso', 'Terminado'], default: 'Pendiente' },
    }],
    deliveryDate: { type: Date },
    status: { type: String, enum: ['Pendiente', 'Completada'], default: 'Pendiente' },
    isPaid: { type: Boolean, default: false },
    remainingAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    advanceAmount: { type: Number, default: 0 },
    subtotalAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    collection: 'order-repairs'
});

orderRepairSchema.plugin(softDelete, { deletedAt: true, deletedBy: true, overrideMethods: true });
orderRepairSchema.plugin(paginate);

orderRepairSchema.pre('save', async function (next) {
    // TODO: generate ORDER ID
    // this.set('slug', slugName);

});

const OrderRepair = mongoose.model('OrderRepair', orderRepairSchema);

export default OrderRepair;
