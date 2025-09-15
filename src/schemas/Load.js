const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema({
    loadNumber: { type: String, required: true },
    containerNo: { type: String },
    sealNumber: { type: String },
    eta: { type: Date, required: true },
    lfd: { type: Date },
    hbl: { type: String },
    bol: { type: String, required: true },
    dispature: { type: String },
    lineHaul: { type: String },
    pickup_address: { type: String },
    delivery_address: { type: String },
    houseBillLading: { type: String },
    oceanBillLading: { type: String },
    salesRep1: { type: String, default: '' },
    salesRep2: { type: String, default: '' },
    workOrder: { type: Boolean, default: false },
    type: { type: String, required: true },
    loadType: { type: String },
    bookingNo: { type: String },
    pds: { type: Number, default: 0 },
    fsc: { type: Number, default: 0 },
    ratePercent: { type: Boolean, default: false },
    referenceNo: { type: String },
    pickupNo: { type: String },
    chassisNo: { type: String },
    otherCharges: [{
        key: { type: String, default: 0 },
        value: { type: Number, default: 0 }
    }],
    total: { type: Number, default: 0 },
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
    weightlbs: { type: Number, default: 0 },
    weightkg: { type: Number, default: 0 },
    comodityType: { type: String, default: "" },
    value: { type: Number, default: 0 },
    volume: { type: String, default: "" },
    packages: { type: Number, default: 0 },
    customsBroker: { type: String },
    proMiles: { type: String },
    empty: { type: String },
    pickUpFull: { type: String },
    pickUpEmpty: { type: String },
    deliverFull: { type: String },
    deliverEmpty: { type: String },
    // Array of photo URLs
    assets: [{ type: String }],
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer'
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
