const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerId: { type: String, default: '' },
    address: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, default: '' },
        addressLine3: { type: String, default: '' },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    billingAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String, default: '' },
        addressLine3: { type: String, default: '' },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    // Array of photo URLs
    assets: [{ type: String }],
    sameAsMailingAddress: { type: Boolean, default: false },
    primaryContact: { type: String, default: '' },
    telephone: { type: String, default: '' },
    email: { type: String, default: '' },
    tollFree: { type: String, default: '' },
    fax: { type: String, default: '' },
    secondaryContact: { type: String, default: '' },
    secondaryEmail: { type: String, default: '' },
    billingEmail: { type: String, default: '' },
    mcNumber: { type: String, default: '' },
    ursNumber: { type: String, default: '' },
    isBlacklisted: { type: Boolean, default: false },
    isBroker: { type: Boolean, default: false }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
