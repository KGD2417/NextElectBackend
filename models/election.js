const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    candidates: [{ type: String }],
    endTime: { type: Date, required: true },
    isEnded: { type: Boolean, default: false }
});

module.exports = mongoose.model("Election", electionSchema);