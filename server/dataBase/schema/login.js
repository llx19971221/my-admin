const mongoose = require("../connect");
const Schema = mongoose.Schema;
let schema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSuper: {
        type: Number,
        required: true,
        default: 0
    },
    createTime: {
        type: String,
        default: Date.now()
    },
});

module.exports = mongoose.model("login", schema);