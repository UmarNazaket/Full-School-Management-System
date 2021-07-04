/**
 * Created by Bilal Khursheed on 5/20/2021.
 */
var mongoose = require("mongoose"),
    timestamps = require("mongoose-timestamp"),
    bcrypt = require("bcryptjs"),
    SALT_WORK_FACTOR = 10,
    winston = require("../../../../../config/winston");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
    },
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
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    userType: { // 0 => admin, 1 =>student, 2 => teacher, 3 => employees, 4 => parents
        type: Number,
        require: true
    },
    phoneNumber: {
        type: Number,
        default: null,
    },
    status: { // 0=> active 1 => pending, 2 => accepted,  3 => rejected, 4 => expel 5=> delete
        type: Number,
        default: 0
    },
    DOB: {
        type: String,
        default: null
    },
    class: {
        type: Number
    },
    studentId: [{
        type: Schema.Types.ObjectId,
        ref: 'SchoolUser'
    }],
    RegNo: {
        type: String,
    },
    schoolName: {
        type: String,
        default: ""
    },
});

UserSchema.plugin(timestamps);

UserSchema.index({
    email: 1,
});
UserSchema.pre("save", function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// seed documents
const SchoolUser = mongoose.model("SchoolUser", UserSchema);

SchoolUser.find({}, (err, aUsers) => {
    if (!aUsers.length) {
        let superAdmin = {
            name: "Super Admin",
            firstName: "Super",
            lastName: "Admin",
            fatherName: "Admin",
            email: "admin@admin.com",
            password: "admin1234",
            phoneNumber: 090078601,
            userType: 0,
            status: 0,
            DOB: "22-feb-1997",
            schoolName: "Public School"
        };

        let aUser = new SchoolUser(superAdmin);
        aUser.save((err) => {
            if (err) {
                winston.error(err);
            }
        });
    }
});

module.exports = SchoolUser;