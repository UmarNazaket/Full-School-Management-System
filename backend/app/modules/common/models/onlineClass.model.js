/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var OnlineClassSchema = new Schema({
    day: { // 1 => Monday 2=> tuesday 3=> wednesday 4=> thursday 5=> friday 6=> saturday 7=> sundat
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
        type: Schema.Types.ObjectId,
            ref: 'SchoolClass'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    },
    link : {
        type: String,
        required: true,
    },
    teacherId : {
        type: Schema.Types.ObjectId,
        ref: 'SchoolClass'
    }

});

OnlineClassSchema.plugin(timestamps);


const OnlineClass = mongoose.model("OnlineClass", OnlineClassSchema);



module.exports = OnlineClass;