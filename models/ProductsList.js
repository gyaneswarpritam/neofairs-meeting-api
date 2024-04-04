var mongoose = require("mongoose");

var productsList = new mongoose.Schema(
    {
        title: { type: String },
        url: { type: String },
        locked: { type: Boolean, default: false },
        like: { type: String, default: 0 },
        review: { type: String, default: 0 },
        active: { type: String, default: true },
        deleted: { type: String, default: false },
        stall: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "stall"
        },
    },
    {
        timestamps: true,
    }
);

productsList.index({ url: 1 });

module.exports = mongoose.model("ProductsList", productsList);
