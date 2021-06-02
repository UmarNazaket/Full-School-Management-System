/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var FeeSchema = new Schema({
    type: { // 1 => regular 2=> monthly 
        type: Number,
        required: true,
    },
    fee: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: String,
        required: true,
    },
    isSubmitted: {
        type: Boolean,
        default : false
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolUser'
    }

});

FeeSchema.plugin(timestamps);


const StudentFee = mongoose.model("StudentFee", FeeSchema);



module.exports = StudentFee;