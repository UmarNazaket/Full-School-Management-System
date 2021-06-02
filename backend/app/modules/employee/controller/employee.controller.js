const _ = require('lodash'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    responseModule = require('../../../../config/response'),
    winston = require('../../../../config/winston'),
    multer = require('../../../../config/multer'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    SchoolUser = mongoose.model('SchoolUser'),
    SchoolClass = mongoose.model('SchoolClass'),
    Subjects = mongoose.model('Subjects'),
    TimeTable = mongoose.model('TimeTable'),
    StudentFee = mongoose.model('StudentFee');

let generateStudentFee = async (req, res, next) => {
    try {
        let type = req.body.type || 1,
            fee = req.body.fee,
            submissionDate = req.body.submissionDate,
            student = req.body.student,

            studentFee = await StudentFee.create({
                type: type,
                fee: fee,
                submissionDate: submissionDate,
                student: student
            });
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Students fee is generated successfully.',
            data: {
                isFeeGenerated: true
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let viewFeeChallan = async (req, res, next) => {
    try {
        let studentId = req.body.studentId;

        let studentFee = await StudentFee.findOne({
            student: ObjectId(studentId)
        }).lean();
        if (studentFee) {
            studentFee.submissionDate = moment.unix(studentFee.submissionDate).format('DD-MM-YYYY')
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student fee is fetched Successfuly.',
                data: {
                    studentFee: studentFee
                }
            });
        } else {
            return next({
                msgCode: 1200
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let updateFeeChallan = async (req, res, next) => {
    try {
        let type = req.body.type || 1,
            fee = req.body.fee,
            feeChallanId = req.body.feeChallanId,
            submissionDate = req.body.submissionDate,
            student = req.body.student;
        await StudentFee.findOneAndUpdate({
            _id: ObjectId(feeChallanId)
        }, {
            type: type,
            fee: fee,
            submissionDate: submissionDate,
            student: student
        });
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Students fee is updated successfully.',
            data: {
                isFeeUpdated: true
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
module.exports = {
    generateStudentFee,
    viewFeeChallan,
    updateFeeChallan
}