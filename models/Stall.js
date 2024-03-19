var mongoose = require("mongoose");

var stallSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        hall_details: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "hall",
            required: true,
        },
        visitng_card_details: { type: Object },
        stall_details: { type: Object },
        social_media: { type: Object },
        products: [{ media: { type: String } }],
        company_profile: { type: Object },
        active: { type: String, default: true },
        deleted: { type: String, default: false },
        exhibitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "exhibitor",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

stallSchema.index({ exhibitor: 1 });
stallSchema.index({ hall_details: 1 });
stallSchema.index({ name: 1 });

module.exports = mongoose.model("Stall", stallSchema);
