var mongoose = require("mongoose");

var exhibitorNotification = new mongoose.Schema(
    {
        trackEventType: { type: String, required: true },
        data: { type: Object },
        visitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visitor"
        },
        exhibitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exhibitor"
        },
        ip: { type: String },
    },
    {
        timestamps: true,
    }
);

exhibitorNotification.index({ trackEvent: 1 });

module.exports = mongoose.model("ExhibitorNotification", exhibitorNotification);
