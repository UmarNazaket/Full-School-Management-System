/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");
// bcrypt = require("bcryptjs"),
// SALT_WORK_FACTOR = 10,
// winston = require("../../../../../config/winston");

var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'SchoolUser'
    }],
    teacher: [{
        type: Schema.Types.ObjectId,
        ref: 'SchoolUser'
    }],
    class: {
        type: Schema.Types.ObjectId,
            ref: 'SchoolClass'
    },
    SchemeOfStudy: {
        type: String,
        default: ''
    },

});

SubjectSchema.plugin(timestamps);


const Subjects = mongoose.model("Subjects", SubjectSchema);



module.exports = Subjects;