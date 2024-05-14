const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
    shipperName: { type: String, required: true },
    address: {
        addressLine1: { type: String, default: '' },
        addressLine2: { type: String, default: '' },
        addressLine3: { type: String, default: '' },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        postalZip: { type: String, default: '' }
    },
    contactName: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    telephone: {
        number: { type: String, default: '' },
        extension: { type: String, default: '' },
        tollFree: { type: String, default: '' },
        fax: { type: String, default: '' }
    },
    shippingHours: { type: String, default: '' },
    appointments: { type: String, enum: ['Yes', 'No'], default: 'No' },
    majorIntersectionDirections: { type: String, default: '' },
    duplicateInfo: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

const Shipper = mongoose.model('Shipper', shipperSchema);

module.exports = Shipper;
