/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp");

var Schema = mongoose.Schema;

var announcements = new Schema({

    announcement: {
        type: String,
    },


});

announcements.plugin(timestamps);


const announcement = mongoose.model("announcements", announcements);



module.exports = announcement;