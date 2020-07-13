const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/elAdm');
let db = mongoose.connection;
db.on("open", function() {
    console.log('链接成功')
});

module.exports = mongoose;