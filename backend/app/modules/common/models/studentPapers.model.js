/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var StudentPapers = new Schema({
    
    link: {
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
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    }

});

StudentPapers.plugin(timestamps);


const StudentsPapers = mongoose.model("StudentPapers", StudentPapers);



module.exports = StudentsPapers;