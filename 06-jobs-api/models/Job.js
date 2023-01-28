const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company is required"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: [true, "Created by user is required"],
        ref: "User"
    }
}, { timestamps: true })


const Job = mongoose.model("Job", JobSchema);
module.exports = Job;