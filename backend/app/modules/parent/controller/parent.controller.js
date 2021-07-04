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
    Attendance = mongoose.model('Attendance'),
    Subjects = mongoose.model('Subjects'),
    TimeTable = mongoose.model('TimeTable'),
    StudentMarks = mongoose.model('StudentMarks'),
    StudentFee = mongoose.model('StudentFee'),
    AdmissionForm = mongoose.model('AdmissionForm');

let generateStudentAdmission = async (req, res, next) => {
    try {
        let firstName = req.body.user.firstName || '',
            lastName = req.body.user.lastName || '',
            fatherName = req.body.user.fatherName || '',
            email = req.body.user.email || '',
            phoneNumber = req.body.user.phoneNumber || '',
            status = req.body.user.status || 0,
            address = req.body.user.address || '',
            classes = req.body.user.class || '';

        await AdmissionForm.create({
            firstName: firstName,
            lastName: lastName,
            fatherName: fatherName,
            email: email,
            phoneNumber: phoneNumber,
            status: status,
            address: address,
            class: classes

        });
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Students admission is generated successfully.',
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
let listofBachas = async (req, res, next) => {
    try {
        let parentId = req.body.parentId || 0;

        let childs = await SchoolUser.find({
            _id: ObjectId(parentId)
        }).populate({
            path: 'studentId',
            module: 'SchoolUser'
        });
        let studentsList = [];
        childs.map((item) => {
            studentsList = [...studentsList, item.studentId]
        })
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Student fetched successfully.',
            data: {
                studentsList
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
let viewStudentRecord = async (req, res, next) => {
    try {
        //  let parentId =  '60b91cc5e614a45214a0ec18'; //req.body.parentId || 0;
        let studentId = (req.body.data.studentId) || '60c505913095fd2e844c2b73';
            status = req.body.data.status || 0,
            student;
        console.log(studentId, status)
        console.log(req.body)
        let firstTerm = [];
        let secondTerm = [];
        let thirdTerm = [];
        if (status == 0) {
            // let studentId = (req.body._id) || '60c505913095fd2e844c2b73';
            student = await StudentFee.find({
                student: studentId
            }).populate({
                path: 'student',
                module: 'SchoolUser'
            })
            student = JSON.parse(JSON.stringify(student))
            student.map((item) => {
                item.studentName = item.student.firstName + "" + item.student.lastName
                item.RegNo = item.student.RegNo
                item.submissionDate = moment.unix(item.submissionDate).format('YYYY-MM-DD')
                delete item.student
            })

        } else if (status == 1) {
            // let studentId = '60a64ef1b3c56e3cdc44f9bc' ;// (req.user._id) || 0;
            let studentMarks = await StudentMarks.find({
                studentId: studentId,

            }).populate([{
                path: 'subjectId',
                model: 'Subjects',
                required: true,
            }]).lean()
            studentMarks = JSON.parse(JSON.stringify(studentMarks))

            studentMarks.map((item) => {
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
            student = [
                firstTerm,
                secondTerm,
                thirdTerm
            ]
        } else if (status == 2) {
            student = await Attendance.find({
                studentId: studentId
            }).populate([{
                path: 'subjectId',
                model: 'Subjects',
                required: true,
            }]).lean()
            student = JSON.parse(JSON.stringify(student))

            student.map((item) => {
                item.subjectName = item.subjectId.name;
                item.date = moment.unix(item.date).format('YYYY-MM-DD')
                delete item.subjectId
            })
        }

        //         let studentFee = await StudentFee.findOne({
        //             student: ObjectId(studentId)
        //         }).lean();

        return responseModule.successResponse(res, {
            success: 1,
            message: 'Student fetched successfully.',
            data: {
                student
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
}
// let viewFeeChallan = async (req, res, next) => {
//     try {
//         let studentId = req.body.studentId;

//         let studentFee = await StudentFee.findOne({
//             student: ObjectId(studentId)
//         }).lean();
//         if (studentFee) {
//             studentFee.submissionDate = moment.unix(studentFee.submissionDate).format('DD-MM-YYYY')
//             return responseModule.successResponse(res, {
//                 success: 1,
//                 message: 'Student fee is fetched Successfuly.',
//                 data: {
//                     studentFee: studentFee
//                 }
//             });
//         } else {
//             return next({
//                 msgCode: 1200
//             });
//         }

//     } catch (err) {
//         winston.error(err);
//         return next({
//             msgCode: 1037
//         });
//     }
// }
// let updateFeeChallan = async (req, res, next) => {
//     try {
//         let type = req.body.type || 1,
//             fee = req.body.fee,
//             feeChallanId = req.body.feeChallanId,
//             submissionDate = req.body.submissionDate,
//             student = req.body.student;
//         await StudentFee.findOneAndUpdate({
//             _id: ObjectId(feeChallanId)
//         }, {
//             type: type,
//             fee: fee,
//             submissionDate: submissionDate,
//             student: student
//         });
//         return responseModule.successResponse(res, {
//             success: 1,
//             message: 'Students fee is updated successfully.',
//             data: {
//                 isFeeUpdated: true
//             }
//         });

//     } catch (err) {
//         winston.error(err);
//         return next({
//             msgCode: 1037
//         });
//     }
// }
module.exports = {
    generateStudentAdmission,
    listofBachas,
    viewStudentRecord
    // viewFeeChallan,
    // updateFeeChallan
}