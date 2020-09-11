const mongoose = require("mongoose")
const workerSchema = new mongoose.Schema(
    {
        worker_name: {
            type: String,
            required: 'Please enter your name'
        },
        worker_password: {
            type: String,
            required: 'Please enter your password'
        },
        worker_address: {
            type: String,
            required: 'Please enter your address'
        },
        worker_mobile: {
            type: String,
            required: 'Please enter your mobile'
        },
        creation_date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("Worker", workerSchema);