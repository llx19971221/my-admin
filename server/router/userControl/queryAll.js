const express = require("express");
const router = express.Router();
const {address} = require("../../dataBase/schema");

router.post("/", (req, response) => {
    address.find().then(result => {
        console.log(result)
        response.send({data: result, code: 200})
    })


})

module.exports = router