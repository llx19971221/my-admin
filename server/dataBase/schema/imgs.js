const mongoose = require("../connect");
const Schema = mongoose.Schema;
let schema = new Schema({
    src: {
        type: String,
        alias: "源地址",
        required: true
    },
    fileName: {
        type: String,
        alias: "文件名",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        alias: "创建日期",
        required: true
    }
});

module.exports = mongoose.model("Img", schema);