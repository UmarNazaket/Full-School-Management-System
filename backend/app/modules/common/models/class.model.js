/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");
// bcrypt = require("bcryptjs"),
// SALT_WORK_FACTOR = 10,
// winston = require("../../../../../config/winston");

var Schema = mongoose.Schema;

var ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    classNo: {
        type: Number,
        required: true
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    }]

});

ClassSchema.plugin(timestamps);
const SchoolClass = mongoose.model("SchoolClass", ClassSchema);



module.exports = SchoolClass;