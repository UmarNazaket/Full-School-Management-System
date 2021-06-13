/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var TimeTableSchema = new Schema({
    day: { // 1 => Monday 2=> tuesday 3=> wednesday 4=> thursday 5=> friday 6=> saturday 7=> sunday
        type: Number,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    class: {
        type: Number,
    },
    subject: {
        type: String,
    }

});

TimeTableSchema.plugin(timestamps);


const TimeTable = mongoose.model("TimeTable", TimeTableSchema);



module.exports = TimeTable;