var mongoose = require("mongoose");

var stallSchema = new mongoose.Schema(
    {
        stallName: { type: String, required: true },
        stallDescription: { type: String },
        hallId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hall"
        },
        hallName: { type: String },
        visitng_card_details: { type: Object },
        stall_details: { type: Object },
        social_media: { type: Object },
        stallImage: { type: String },
        stallLogo: { type: String },
        companyLogo: { type: String },
        active: { type: String, default: true },
        deleted: { type: String, default: false },
        exhibitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "exhibitor"
        },
    },
    {
        timestamps: true,
    }
);

stallSchema.index({ exhibitor: 1 });
stallSchema.index({ stallName: 1 });
stallSchema.index({ hallId: 1 });

module.exports = mongoose.model("Stall", stallSchema);
