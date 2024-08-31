const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    designation: { type: String, required: true },
    companyName: { type: String, required: true },
    companyType: { type: Object },
    productInfo: { type: Object },
    optionalInfo: { type: Object },
    address: { type: String, required: true },
    country: { type: String, required: true },
    phoneNo: { type: String, required: true },
    loggedInTime: { type: String, default: '' },
    loggedInIP: { type: String, default: '' },
    deleted: { type: Boolean, default: false },
    password: { type: String },
    loggedIn: { type: Boolean, default: false },
    active: { type: String, default: false },
    reject: { type: String, default: false },
    blocked: { type: String, default: false },
},
    {
        timestamps: true,
    });
visitorSchema.index({ email: 1, delete: 1 }, { unique: true });
visitorSchema.index({ phoneNo: 1 });
visitorSchema.index({ firstName: 1 });
visitorSchema.index({ lastName: 1 });
module.exports = mongoose.model('Visitor', visitorSchema);
