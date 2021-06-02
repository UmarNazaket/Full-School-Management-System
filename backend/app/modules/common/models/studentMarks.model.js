/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var StudentMarksSchema = new Schema({
    firstTerm :{
        totalMarks :{
            type: String
        },
        obtMarks :{
            type: String
        }
    },
    secondTerm :{
        totalMarks :{
            type: String
        },
        obtMarks :{
            type: String
        }
    },
    thirdTerm :{
        totalMarks :{
            type: String
        },
        obtMarks :{
            type: String
        }
    },
    studentId: {
        type: Schema.Types.ObjectId,
            ref: 'SchoolUser'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    }

});

StudentMarksSchema.plugin(timestamps);


const StudentMarks = mongoose.model("StudentMarks", StudentMarksSchema);



module.exports = StudentMarks;