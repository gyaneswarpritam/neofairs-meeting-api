var mongoose = require("mongoose");

var exhibitorSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        designation: { type: String, required: true },
        companyName: { type: String, required: true },
        companyType: { type: Object },
        productInfo: { type: Object },
        optionalInfo: { type: Object },
        password: { type: String },
        address: { type: String, required: true },
        country: { type: String, required: true },
        phoneNo: { type: String, required: true },
        loggedInTime: { type: String, default: '' },
        loggedInIP: { type: String, default: '' },
        deleted: { type: Boolean, default: false },
        active: { type: String, default: false },
        reject: { type: String, default: false },
        blocked: { type: String, default: false },
    },
    {
        timestamps: true,
    }
);

exhibitorSchema.index({ email: 1, delete: 1 }, { unique: true });
exhibitorSchema.index({ phoneNo: 1 });
exhibitorSchema.index({ firstName: 1 });
exhibitorSchema.index({ lastName: 1 });

module.exports = mongoose.model("Exhibitor", exhibitorSchema);
