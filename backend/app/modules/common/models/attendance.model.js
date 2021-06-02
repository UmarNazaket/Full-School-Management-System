/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    day: { // 1 => Monday 2=> tuesday 3=> wednesday 4=> thursday 5=> friday 6=> saturday 7=> sundat
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

    classId: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'SchoolUser'
    }, 
    status : {
        type: Schema.Types.Number,
        required: true
    }

});

AttendanceSchema.plugin(timestamps);


const Attendance = mongoose.model("Attendance", AttendanceSchema);



module.exports = Attendance;