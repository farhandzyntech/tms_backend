const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema({
    loadNumber: { type: String, required: true },
    containerNo: { type: String, required: true },
    sealNumber: { type: String, required: true },
    eta: { type: Date, required: true },
    lfd: { type: Date, required: true },
    houseBillLading: { type: String, required: true },
    oceanBillLading: { type: String, required: true },
    salesRep1: { type: String, default: '' },
    salesRep2: { type: String, default: '' },
    workOrder: { type: Boolean, default: false },
    type: { type: String, required: true },
    rate: { type: Number, required: true },
    pds: { type: Number, default: 0 },
    fsc: { type: Number, default: 0 },
    ratePercent: { type: Boolean, default: false },
    otherCharges: { type: Number, default: 0 },
    equipmentType: { type: String, default: '' },
    carrierFee: { type: Number, default: 0 },
    currency: { 
        type: String, 
        enum: ['USD', 'EUR', 'GBP'], 
        default: 'USD' 
    },
    date: { type: Date, required: true },
    showTime: { type: Boolean, default: false },
    qty: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    customsBroker: { type: String },
    proMiles: { type: String },
    empty: { type: String },
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    shipper: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shipper', 
        required: true 
    },
    consignee: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Consignee', 
        required: true 
    },
    carrier: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ExternalCarrier', 
        required: true 
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: { 
        type: String, 
        enum: ['Open', 'Closed', 'Pending'], 
        default: 'Open' 
    },
}, { timestamps: true });

const Load = mongoose.model('Load', LoadSchema);

module.exports = Load;
