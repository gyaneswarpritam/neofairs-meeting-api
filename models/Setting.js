var mongoose = require("mongoose");

var settingSchema = new mongoose.Schema(
    {
        startDateTime: { type: String, required: true },
        endDateTime: { type: String, required: true },
        timezone: { type: String, required: true },
        duration: { type: String, required: true },
        active: { type: String, default: true },
        deleted: { type: String, default: false },
    },
    {
        timestamps: true,
    }
);

settingSchema.index({ startDateTime: 1 });
settingSchema.index({ endDateTime: 1 });

module.exports = mongoose.model("Setting", settingSchema);
