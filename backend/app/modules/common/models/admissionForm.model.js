/**
 * Created by Fazian Khan on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var admissionForm = new Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
    },
    email: {
        type: String,
    },

    phoneNumber: {
        type: Number,
        default: '',
    },
    status: { // 0=> active 1 => pending, 2 => accepted,  3 => rejected, 4 => expel 5=> delete
        type: Number,
        default: 1
    },
    DOB: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },

});

admissionForm.plugin(timestamps);

const AdmissionForm = mongoose.model("AdmissionForm", admissionForm);

module.exports = AdmissionForm;