const {
    data
} = require('../../../../config/winston');

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
    OnlineExam = mongoose.model('OnlineExam'),
    OnlineClass = mongoose.model('OnlineClass'),
    StudentFee = mongoose.model('StudentFee'),
    announcements = mongoose.model('announcements'),
    Orders = mongoose.model('Orders'),
    TimeTable = mongoose.model('TimeTable');

let viewTimeTable = async (req, res, next) => {
    try {
        console.log('*************************')
        console.log(req.user)
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73',

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
                item.startTime = moment(item.startTime).format('hh:ss')
                item.endTime = moment(item.endTime).format('hh:ss')
                delete item.subject;
            } else {
                studentTimeTable.splice(index, 1)
            }

        });
        let Monday = studentTimeTable.filter((item) => {
            return item.day === 2
        })
        let Tuesday = studentTimeTable.filter((item) => {
            return item.day === 2
        })
        let Wednesday = studentTimeTable.filter((item) => {
            return item.day === 2
        })
        let Thursday = studentTimeTable.filter((item) => {
            return item.day === 2
        })
        let Friday = studentTimeTable.filter((item) => {
            return item.day === 2
        })

        if (studentTimeTable) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student timetable is fetched successfully.',
                data: {
                    TimeTable: {
                        Monday,
                        Tuesday,
                        Wednesday,
                        Thursday,
                        Friday


                    }
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        console.log('here is the student id', studentId)
        let studentSubjects = await Subjects.find({
            students: {
                $in: ObjectId(studentId)
            },

        }).populate([{
            path: 'teacher',
            model: 'SchoolUser',
        }]).lean().select(['teacher', 'name', 'price']);
        studentSubjects.forEach((item) => {
            item.subjectName = item.name;
            item.teacherName = item.teacher[0].firstName + "" + item.teacher[0].lastName
            //  item.teacher[0].pop
        })
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        let subjectId = (req.body.subjectId) || 0;
        let filter = {};
        if (subjectId) {
            filter = {
                studentId: ObjectId(studentId),
                subjectId: ObjectId(subjectId)
            }
        } else {
            filter = {
                studentId: ObjectId(studentId)
            }
        }
        console.log(filter)
        let studentAttendance = await Attendance.find(filter)
            .populate([{
                path: 'subjectId',
                model: 'Subjects',
                required: true,
            }]).lean()
        studentAttendance = JSON.parse(JSON.stringify(studentAttendance))

        studentAttendance.map((item) => {
            item.subjectName = item.subjectId.name;
            item.date = moment(item.date).format('YYYY-MM-DD')
            delete item.subjectId
        })
        let present = [],
            absent = [];
        for (let x = 1; x <= 12; x++) {
            let data1 = studentAttendance.filter((item) => {
                return moment(item.date).format('MM') == '0' + x && item.status == 1
            })
            present = [...present, data1.length]
            let data = studentAttendance.filter((item) => {
                return moment(item.date).format('MM') == '0' + x && item.status == 0
            })
            absent = [...absent, data.length]

        }
        if (studentAttendance) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student attendance fetched successfully.',
                data: {
                    studentAttendance: studentAttendance,
                    present: present,
                    absent: absent
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        let studentMarks = await StudentMarks.find({
            studentId: studentId,

        }).populate([{
            path: 'subjectId',
            model: 'Subjects',
            required: true,
        }]).lean()
        studentMarks = JSON.parse(JSON.stringify(studentMarks))
        let firstTerm = [];
        let secondTerm = [];
        let thirdTerm = [];
        studentMarks.map((item) => {
            let data = {
                totalMarks: item.firstTerm ? item.firstTerm.totalMarks : 0,
                obtMarks: item.firstTerm ? item.firstTerm.obtMarks : 0,
                totalMarks: item.firstTerm ? item.firstTerm.totalMarks : 0,
                subjectName: item.subjectId.name
            }
            firstTerm = [...firstTerm, data]
            let data2 = {
                totalMarks: item.secondTerm ? item.secondTerm.totalMarks : 0,
                obtMarks: item.secondTerm ? item.secondTerm.obtMarks : 0,
                totalMarks: item.secondTerm ? item.secondTerm.totalMarks : 0,
                subjectName: item.subjectId.name
            }
            secondTerm = [...secondTerm, data2]
            let data3 = {
                totalMarks: item.thirdTerm ? item.thirdTerm.totalMarks : 0,
                obtMarks: item.thirdTerm ? item.thirdTerm.obtMarks : 0,
                totalMarks: item.thirdTerm ? item.thirdTerm.totalMarks : 0,
                subjectName: item.subjectId.name
            }
            thirdTerm = [...thirdTerm, data3]
            delete item.subjectId
        })

        if (studentMarks) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student Marks fetched successfully.',
                data: {
                    studentMarks: {
                        firstTerm,
                        secondTerm,
                        thirdTerm
                    }
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
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
        let firstTerm = [];
        let secondTerm = [];
        let thirdTerm = [];
        studentMarks.map((item) => {
            // item.subjectName = item.subjectId.name;
            let data = {
                totalMarks: item.firstTerm.totalMarks,
                obtMarks: item.firstTerm.obtMarks,
                totalMarks: item.firstTerm.totalMarks,
                subjectName: item.subjectId.name
            }
            firstTerm = [...firstTerm, data]
            let data2 = {
                totalMarks: item.secondTerm.totalMarks,
                obtMarks: item.secondTerm.obtMarks,
                totalMarks: item.secondTerm.totalMarks,
                subjectName: item.subjectId.name
            }
            secondTerm = [...secondTerm, data2]
            let data3 = {
                totalMarks: item.thirdTerm.totalMarks,
                obtMarks: item.thirdTerm.obtMarks,
                totalMarks: item.thirdTerm.totalMarks,
                subjectName: item.subjectId.name
            }
            thirdTerm = [...thirdTerm, data3]
            delete item.subjectId
        })

        if (studentMarks) {

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Student Marks fetched successfully.',
                data: {
                    studentMarks: {
                        firstTerm,
                        secondTerm,
                        thirdTerm
                    }
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        subjectId = _.trim(req.body.subjectId);

        let time = moment().unix()


        let studentOnlineClass = await OnlineClass.find({}).populate([{
            path: 'subject',
            model: 'Subjects',
            required: true,
            populate: {
                path: 'students',
                module: 'SchoolUser',
                match: {
                    _id: ObjectId(studentId)
                }
            }
        }]).lean()
        studentOnlineClass = JSON.parse(JSON.stringify(studentOnlineClass))
        // console.log(studentOnlineClass);

        console.log(studentOnlineClass)
        studentOnlineClass = studentOnlineClass.filter((item) => {

            return parseInt(item.startTime) <= time && parseInt(item.endTime) > time
        })
        studentOnlineClass.map((item) => {
            item.startTime = moment.unix(item.startTime).format(' HH:mm A');
            item.endTime = moment.unix(item.endTime).format('HH:mm A');
            item.subjectName = item.subject.name
            delete item.subject
        })
        console.log(time)
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
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        let studentFee = await StudentFee.find({
            student: studentId
        }).populate({
            path: 'student',
            module: 'SchoolUser'
        })
        studentFee = JSON.parse(JSON.stringify(studentFee))
        studentFee.map((item) => {
            item.studentName = item.student.firstName + "" + item.student.lastName
            item.RegNo = item.student.RegNo
            item.submissionDate = moment(item.submissionDate).format('YYYY-MM-DD')
            delete item.student
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
let fetchStudentStudyScheme = async (req, res, next) => {
    try {
        let studentId = (req.body.id) || '60c505913095fd2e844c2b73';
        let subjectId = (req.body.subjectId) || 0;
        let studyScheme = await Subjects.find({
            _id: subjectId,
            students: {
                "$in": studentId
            }
        })

        if (studyScheme) {
            studyScheme = JSON.parse(JSON.stringify(studyScheme))
            studyScheme.map((item) => {
                delete item.students;
                delete item.teacher;

            })
            return responseModule.successResponse(res, {
                success: 1,
                message: 'StudyScheme fetched successfully.',
                data: {
                    studyScheme: studyScheme
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
let fetchOnlineExam = async (req, res, next) => {
    try {
        // let studentId = '60a64ef1b3c56e3cdc44f9bc'; //= (req.user._id) || 0,
        let subjectId = (req.body.subjectId) || 0;
        console.log(req.body)
        let time = moment().unix()
        console.log(time)
        let onlineExam = await OnlineExam.find({
            // startTime: {
            //     "$gt": time
            // },
            // endTime: {
            //     "$gt": time
            // },
            subject: subjectId
        })

        if (onlineExam) {
            onlineExam = JSON.parse(JSON.stringify(onlineExam))

            onlineExam.map((item) => {
                delete item.teacherId;
            })
            onlineExam = onlineExam.filter((item) => {
                return parseInt(item.startTime) < time && parseInt(item.endTime) < time
            })
            onlineExam.map((item) => {
                item.startTime = moment.unix(item.startTime).format('YYYY-MM-DD HH:mm:ss')
                item.endTime = moment.unix(item.endTime).format('YYYY-MM-DD  HH:mm:ss')
            })
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online Exam fetched successfully.',
                data: {
                    onlineExam: onlineExam
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
let addData = async (req, res, next) => {
    try {
        console.log('dfgchvjbknljcfxdxgchvjb,')
        let onlineExam = await SchoolUser.insertMany(req.body)
        if (onlineExam) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online Exam fetched successfully.',
                data: {
                    onlineExam: onlineExam
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
let announcementsAdd = async (req, res, next) => {
    try {
        console.log('dfgchvjbknljcfxdxgchvjb,')
        let onlineExam = await announcements.create(req.body)
        if (onlineExam) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online Exam fetched successfully.',
                data: {
                    onlineExam: onlineExam
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
let addOrder = async (req, res, next) => {
    try {
        let Order = await Orders.create(req.body.data)
        if (Order) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Orders added successfully.',
                data: {
                    Orders: Orders
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
let announcementsfetch = async (req, res, next) => {
    try {
        console.log('dfgchvjbknljcfxdxgchvjb,')
        let announcement = await announcements.find({})
        if (announcement) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Online Exam fetched successfully.',
                data: {
                    announcement: announcement
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
    fetchStudentFeeChallan,
    fetchStudentStudyScheme,
    fetchOnlineExam,
    addData,
    announcementsAdd,
    announcementsfetch,
    addOrder
}