/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    firstName: { // 1 => regular 2=> monthly 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        
    },
    address: {
        type: String,
        default : ""
    },
    city: {
        type: String,
        default : ""
    },
    state: {
        type: String,
        default : ""
    },
    country: {
        type: String,
        default : ""
    },
    postalCode: {
        type: String,
        default : ""
    },
    email: {
        type: String,
        default : ""
    },
    bookName: {
        type: String,
        default : ""
    },
    price: {
        type: String,
        default : ""
    },
    orderNote: {
        type: String,
        default : ""
    }

});

OrderSchema.plugin(timestamps);


const Orders = mongoose.model("Orders", OrderSchema);



module.exports = Orders;