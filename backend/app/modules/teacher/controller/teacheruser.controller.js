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
    OnlineClass = mongoose.model('OnlineClass'),
    StudentMarks = mongoose.model('StudentMarks'),
    OnlineExam = mongoose.model('OnlineExam'),
    Attendance = mongoose.model('Attendance');

let viewTimeTable = async (req, res, next) => {
    try {
        let teacherId = (req.user._id) || 0,

            teacherTimeTable = await TimeTable.find({}).populate([{
                path: 'subject',
                model: 'Subjects',
                required: true,
                populate: {
                    path: 'teacher',
                    module: 'SchoolUser',
                    required: true,
                    match: {
                        _id: ObjectId(teacherId)
                    }

                }
            }]).lean();
        teacherTimeTable = JSON.parse(JSON.stringify(teacherTimeTable));
        teacherTimeTable.map((item, index) => {
            if (item.subject.students.length > 0) {
                item.subjectName = item.subject.name || ''
                item.subjectId = item.subject._id || ''
                delete item.subject;
            } else {
                teacherTimeTable.splice(index, 1)
            }

        })

        if (teacherTimeTable) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Teacher timetbale is fetched successfully.',
                data: {
                    TimeTable: teacherTimeTable
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
let fetchTeacherSubjects = async (req, res, next) => {
    try {
        let teacherId = (req.body.teacherId) || 0;
        // console.log('here is the student id', studentId)
        let teacherSubjects = await Subjects.find({
            teacher: {
                $in: teacherId
            },

        }).select(['name'])
        if (teacherSubjects) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student subjects fetched successfully.',
                data: {
                    teacherSubjects: teacherSubjects
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
let addOnlineClass = async (req, res, next) => {
    try {
        let day = parseInt(req.body.data.day) || 0,
            startTime = req.body.data.startTime,
            endTime = req.body.data.endTime,
            classId = _.trim(req.body.data.classId)|| '60a755585cc40f3fbcf3302f',
            subject = _.trim(req.body.data.subject),
            link = _.trim(req.body.data.link),
            teacherId = _.trim((req.body.data.teacherId));

        startTime = moment(startTime).unix();
        endTime = moment(endTime).unix();


        let addOnlineClass = await OnlineClass.create({
            day,
            startTime,
            endTime,
            classId,
            subject,
            link,
            teacherId

        })
        if (addOnlineClass) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online class is added successfully.',
                data: {
                    OnlineClass: addOnlineClass
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
let fetchOnlineClass = async (req, res, next) => {
    try {
        let teacherId = (req.user._id) || 0;
        // console.log('here is the student id', studentId)
        let teacherOnlineClass = await OnlineClass.find({
            teacherId: teacherId
        })
        if (teacherOnlineClass) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Teacher online classes fetched successfully.',
                data: {
                    teacherOnlineClass: teacherOnlineClass
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
let fetchOnlineClassById = async (req, res, next) => {
    try {
        let teacherId = (req.user._id) || 0;
        let _id = (req.params.id) || 0;
        // console.log('here is the student id', studentId)
        let teacherOnlineClass = await OnlineClass.find({
            teacherId: teacherId,
            _id: _id
        })
        if (teacherOnlineClass) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Teacher online classes fetched successfully.',
                data: {
                    teacherOnlineClass: teacherOnlineClass
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
let fetchStudentBySubject = async (req, res, next) => {
    try {
        let subjectId = (req.body.id) || 0;

        console.log('here is the student id', subjectId)
        let studentList = await Subjects.find({
            _id: ObjectId(subjectId)

        }).populate([{
            path: 'students',
            model: 'SchoolUser',
            required: true,
        }]).lean();
        // console.log(studentList)
        if (studentList[0]) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student list fetched successfully.',
                data: {
                    studentList: studentList ? studentList[0].students ? studentList[0].students : [] : []
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
let addSchemeOfStudy = async (req, res, next) => {
    try {
        let subjectId = (req.body.data.subjectId) || '';
        let SchemeOfStudy = (req.body.data.schemeOfStudy) || '';
        console.log('here is the detail', subjectId, SchemeOfStudy)
        let addSchemeOfStudy = await Subjects.findOneAndUpdate({
            _id: subjectId
        }, {
            SchemeOfStudy: SchemeOfStudy
        }, {
            new: true
        })
        if (addSchemeOfStudy) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Scheme of study is added successfully.',
                data: {
                    addSchemeOfStudy: addSchemeOfStudy
                }
            });
        } else {
            return next({
                msgCode: 1101
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let addAttendance = async (req, res, next) => {
    try {
        let attendanceArry = (req.body.attendanceArry) || [];


        let addSchemeOfStudy = await Attendance.insertMany(attendanceArry)
        if (addSchemeOfStudy) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'students attendance is added successfully.',
                data: {
                    isAttendanceAdded: true
                }
            });
        } else {
            return next({
                msgCode: 1101
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let addStudentMarks = async (req, res, next) => {
    try {
        // let marksArry = (req.body.marksArry) || [];
        console.log('******************************')
        let subjectId = (req.body.data.subjectId) || 0;
        let studentId = (req.body.data.studentId) || 0;
        // let marksArry = (req.body.marksArry) || [];
        let body = {
            subjectId: (subjectId),
            studentId: (studentId),
            firstTerm: req.body.data.firstTerm || {},
            secondTerm: req.body.data.secondTerm || {},
            thirdTerm: req.body.data.thirdTerm || {}
        }
        console.log(body)
        let findStd = await StudentMarks.find({
            subjectId: ObjectId(subjectId),
            studentId: ObjectId(studentId)
        })
        if (findStd) {
            await StudentMarks.create(body)
        } else {
            await tudentMarks.findOneAndUpdate({
                subjectId: subjectId,
                studentId: studentId
            }, body)
        }
        if (true) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'students marks are added successfully.',
                data: {
                    isMarksAdded: true
                }
            });
        } else {
            return next({
                msgCode: 1101
            });
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let addOnlineExam = async (req, res, next) => {
    try {
        let day = parseInt(req.body.day) || 0,
            startTime = req.body.startTime,
            endTime = req.body.endTime,
            classId = _.trim(req.body.classId),
            subject = _.trim(req.body.subject),
            link = _.trim(req.body.link),
            teacherId = _.trim((req.user._id));


        // startTime = moment.unix(startTime).format('HH:MM');
        // endTime = moment.unix(endTime).format('HH:MM');


        let addOnlineExam = await OnlineExam.create({
            day,
            startTime,
            endTime,
            classId,
            subject,
            link,
            teacherId

        })
        if (addOnlineExam) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online Exam is added successfully.',
                data: {
                    addOnlineExam: addOnlineExam
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
    fetchTeacherSubjects,
    addOnlineClass,
    fetchOnlineClass,
    fetchOnlineClassById,
    fetchStudentBySubject,
    addSchemeOfStudy,
    addAttendance,
    addStudentMarks,
    addOnlineExam

}