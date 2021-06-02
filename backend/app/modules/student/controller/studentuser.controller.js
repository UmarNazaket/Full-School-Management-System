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
    Attendance = mongoose.model('Attendance'),
    StudentMarks = mongoose.model('StudentMarks'),
    OnlineClass = mongoose.model('OnlineClass'),
    StudentFee = mongoose.model('StudentFee'),
    TimeTable = mongoose.model('TimeTable');

let viewTimeTable = async (req, res, next) => {
    try {
        let studentId = (req.user._id) || 0,

            studentTimeTable = await TimeTable.find({}).populate([{
                path: 'subject',
                model: 'Subjects',
                required: true,
                populate: {
                    path: 'students',
                    module: 'SchoolUser',
                    required: true,
                    match: {
                        _id: ObjectId(studentId)
                    }

                }
            }]).lean();
        studentTimeTable = JSON.parse(JSON.stringify(studentTimeTable));
        studentTimeTable.map((item, index) => {
            if (item.subject.students.length > 0) {
                item.subjectName = item.subject.name || ''
                item.subjectId = item.subject._id || ''
                delete item.subject;
            } else {
                studentTimeTable.splice(index, 1)
            }

        })

        if (studentTimeTable) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student timetbale is fetched successfully.',
                data: {
                    TimeTable: studentTimeTable
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentSubjects = async (req, res, next) => {
    try {
        let studentId = (req.user._id) || 0;
        console.log('here is the student id', studentId)
        let studentSubjects = await Subjects.find({
            students: {
                $in: studentId
            },

        }).select(['name'])
        if (studentSubjects) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student subjects fetched successfully.',
                data: {
                    studentSubjects: studentSubjects
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentAttendance = async (req, res, next) => {
    try {
        let studentId = (req.user._id) || 0;
        let studentAttendance = await Attendance.find({
            studentId: studentId,

        }).populate([{
            path: 'subjectId',
            model: 'Subjects',
            required: true,
        }]).lean()
        studentAttendance = JSON.parse(JSON.stringify(studentAttendance))
        studentAttendance.map((item) => {
            item.subjectName = item.subjectId.name;
            delete item.subjectId
        })
        if (studentAttendance) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student attendance fetched successfully.',
                data: {
                    studentAttendance: studentAttendance
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentMarks = async (req, res, next) => {
    try {
        let studentId = (req.user._id) || 0;
        let studentMarks = await StudentMarks.find({
            studentId: studentId,

        }).populate([{
            path: 'subjectId',
            model: 'Subjects',
            required: true,
        }]).lean()
        studentMarks = JSON.parse(JSON.stringify(studentMarks))
        studentMarks.map((item) => {
            item.subjectName = item.subjectId.name;
            delete item.subjectId
        })
        if (studentMarks) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student Marks fetched successfully.',
                data: {
                    studentMarks: studentMarks
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentMarksBySubject = async (req, res, next) => {
    try {
        let studentId = (req.user._id) || 0,
            subjectId = _.trim(req.body.subjectId)
        let studentMarks = await StudentMarks.find({
            studentId: studentId,
            subjectId: subjectId

        }).populate([{
            path: 'subjectId',
            model: 'Subjects',
            required: true,
        }]).lean()
        studentMarks = JSON.parse(JSON.stringify(studentMarks))
        studentMarks.map((item) => {
            item.subjectName = item.subjectId.name;
            delete item.subjectId
        })
        if (studentMarks) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student Marks fetched successfully.',
                data: {
                    studentMarks: studentMarks
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentOnlineClass = async (req, res, next) => {
    try {
        let studentId= (req.user._id) || 0,
            subjectId = _.trim(req.body.subjectId)
        let studentOnlineClass= await OnlineClass.find({
            subject: subjectId

        }).populate([{
            path: 'subject',
            model: 'Subjects',
            required: true,
            populate:{
                path: 'students',
                module: 'SchoolUser',
                match: {
                    _id: ObjectId(studentId)
                }
            }
        }]).lean()
        studentOnlineClass = JSON.parse(JSON.stringify(studentOnlineClass))
        studentOnlineClass.map((item) => {
            item.subjectName = item.subject.name
            delete item.subject
        })
        if (studentOnlineClass) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student online class fetched successfully.',
                data: {
                    studentOnlineClass: studentOnlineClass
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let fetchStudentFeeChallan = async (req, res, next) => {
    try {
        let studentId = '60a64ef1b3c56e3cdc44f9bc'; //= (req.user._id) || 0,
        let studentFee= await StudentFee.find({
            student: studentId
        })
    
        if (studentFee) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student fee fetched successfully.',
                data: {
                    studentFee: studentFee
                }
            });
        } else {
            return next({
                msgCode: 1100
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}

module.exports = {
    viewTimeTable,
    fetchStudentSubjects,
    fetchStudentAttendance,
    fetchStudentMarks,
    fetchStudentMarksBySubject,
    fetchStudentOnlineClass,
    fetchStudentFeeChallan
}