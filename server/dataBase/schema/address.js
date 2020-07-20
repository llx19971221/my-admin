const mongoose = require("../connect");
const Schema = mongoose.Schema;
let schema = new Schema({
    ip: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date,
        default:Date.now()
    },
    service: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("address", schema);