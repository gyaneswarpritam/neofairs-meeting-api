var mongoose = require("mongoose");

var stallVideoList = new mongoose.Schema(
    {
        title: { type: String },
        url: { type: String },
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

stallVideoList.index({ url: 1 });

module.exports = mongoose.model("StallVideoList", stallVideoList);
