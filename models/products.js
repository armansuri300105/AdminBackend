const mongoose = require('mongoose')

const data = new mongoose.Schema({
    "Email": String,
    "Number": Number,
    "Name": String,
    "Zipcode": Number,
    "Address": String,
    "Area": String,
    "landmark":String,
    "City":String,
    "State": String,
    "products": [
        {
            "ProductName": String,
            "ProductQuantity": Number,
            "ProductTotalCost": Number,
            "ProductImage": String
        }
    ],
    "TotalBill": Number
})

module.exports = mongoose.model("collection", data);