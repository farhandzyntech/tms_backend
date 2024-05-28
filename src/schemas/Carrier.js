const mongoose = require('mongoose');

const ExternalCarrier = new mongoose.Schema({
    dateAdded: { type: Date, default: Date.now },
    externalCarrierName: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    address: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        addressLine3: { type: String },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        postalZip: { type: String, required: true },
    },
    // Array of photo URLs
    assets: [{ type: String }],
    contactName: { type: String },
    email: { type: String },
    telephone: { type: String, required: true },
    extension: { type: String },
    fax: { type: String },
    tollFree: { type: String },
    paymentTerms: { type: String },
    taxID: { type: String },
    mcNumber: { type: String },
    fmcNumber: { type: String },
    ursNumber: { type: String },
    dotNumber: { type: String },
    notes: { type: String },
    blacklisted: { type: Boolean, default: false },
    corporation: { type: Boolean, default: false },
    factoringCompany: { type: String },
    bookItNow: { type: Boolean, default: false },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('ExternalCarrier', ExternalCarrier);
