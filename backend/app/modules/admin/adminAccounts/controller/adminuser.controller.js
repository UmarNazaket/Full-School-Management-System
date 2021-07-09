/**
 * Created by Bilal Khursheed on 5/20/2021.
 */

const _ = require('lodash'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    responseModule = require('../../../../../config/response'),
    winston = require('../../../../../config/winston'),
    multer = require('../../../../../config/multer'),
    moment = require('moment'),
    mongoose = require('mongoose'),
    SchoolUser = mongoose.model('SchoolUser'),
    SchoolClass = mongoose.model('SchoolClass'),
    Subjects = mongoose.model('Subjects'),
    AdmissionForm = mongoose.model('AdmissionForm'),
    TimeTable = mongoose.model('TimeTable'),
     sgMail = require('@sendgrid/mail');

const getSubAdminUsersListing = async (req, res, next) => {
    try {
        const offset = (req.body.offset) ? parseInt(req.body.offset) : 0,
            limit = (req.body.limit) ? parseInt(req.body.limit) : 100,
            userType = (req.body.userType) ? parseInt(req.body.userType) : 0,
            searchText = (req.body.searchText) ? _.trim(req.body.searchText) : '',
            filters = {
                userType: userType,
                _id: {
                    $nin: [req.user._id]
                }
            };

        if (searchText !== '') {
            filters.$or = [{
                    email: {
                        $regex: searchText,
                        $options: 'i'
                    }
                },
                {
                    name: {
                        $regex: searchText,
                        $options: 'i'
                    }
                },
            ];
        }

        const count = await SchoolUser.countDocuments(filters);
        const subAdminUsers = await SchoolUser.find(filters, {
            name: 1,
            email: 1,
            userType: 1,
            profileImageUrl: 1,
            countryCode: 1,
            phoneNumber: 1,
            status: 1
        }).skip(offset).limit(limit).lean();

        return responseModule.successResponse(res, {
            success: 1,
            message: 'Users listing fetched successfully.',
            data: {
                adminUsers: (subAdminUsers) ? subAdminUsers : [],
                totalCount: count
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1036
        });
    }
};
let isEmailExists = async (req, res, next) => {
    try {
        if (parseInt(req.body.userType) === 1) {
            let RegNo = _.trim(req.body.RegNo);
            let isEmailExists = await SchoolUser.findOne({
                email: RegNo
            });
            if (isEmailExists) {
                return next({
                    msgCode: 2513
                });
            } else {
                return next();
            }
        } else {
            let email = _.trim(req.body.email).toLowerCase();
            let isEmailExists = await SchoolUser.findOne({
                email: email
            });
            if (isEmailExists) {
                return next({
                    msgCode: 2512
                });
            } else {
                return next();
            }
        }
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1035
        });
    }
};
let createSubAdminAccount = async (req, res, next) => {
    try {
        sgMail.setApiKey('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');
        let name = _.trim(req.body.data.firstName) + '' + _.trim(req.body.lastName),
            email = _.trim(req.body.data.email).toLowerCase(),
        studentId;
        // studentId = _.trim(req.body.data.studentId) || 0;

        if (parseInt(req.body.data.userType) === 1) {
            email = req.body.data.RegNo
        }

        if (parseInt(req.body.userType) === 4) {
            studentId = req.body.data.studentId
        }
        let newAdminUser = new SchoolUser({
            name: name,
            firstName: _.trim(req.body.data.firstName),
            lastName: _.trim(req.body.data.lastName),
            fatherName: _.trim(req.body.data.fatherName),
            password: _.trim(req.body.data.password),
            userType: _.trim(req.body.data.userType),
            phoneNumber: _.trim(req.body.data.phoneNumber),
            email: email,
            status: req.body.data.status || 0,
            DOB: _.trim(req.body.data.DOB),
            studentId: studentId,
            class: _.trim(req.body.data.class),
            RegNo: _.trim(req.body.data.RegNo),
            schoolName: _.trim(req.body.data.schoolName),
        });

        newAdminUser.save(err => {
            if (err) {
                winston.error(err);
                return next({
                    msgCode: 1033
                });
            }
            sgMail.send({
                to: email,
                from: 'bilal.khursheed@vizteck.com',
                Subject: 'Admission status',
                html: `<html><body>
                <h1>Congratulations</h1>
                <h3>Here is your login credentials </h3>
                <p>  Email : ${email} </p>
                <p> Parent password : ${req.body.data.password} </p>
                </body> </html>`
            }).then(() => {
                console.log('Email sent');
    
            }).catch(error => {
                console.log(error.response.body);
            });
            return responseModule.successResponse(res, {
                success: 1,
                message: 'User is created successfully.',
                data: {
                    isUserCreated: true
                }
            });

        });
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1033
        });
    }
};
let getSubAdminDetail = async (req, res, next) => {
    try {
        let userId = _.trim(req.params.userId);
        console.log("here is the user id", userId)
        let accountDetail = await SchoolUser.findOne({
            _id: userId
        }, {
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            password: 0
        }).lean();
        if (accountDetail) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'SubAdmin user deatil fetched successfully.',
                data: {
                    subAdminDetail: accountDetail
                }
            });
        } else {
            return next({
                msgCode: 1031
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1030
        });
    }
};
let updateSubAdminAccount = async (req, res, next) => {
    try {
        console.log(req.body.data)
        let userId = _.trim(req.body.data._id),
            name = _.trim(req.body.data.firstName) + ' ' + _.trim(req.body.data.lastName),
            email = _.trim(req.body.data.email).toLowerCase();
        if (parseInt(req.body.data.userType) === 1) {
            email = req.body.data.RegNo
        }
        let updatedAccount = {
            name: name,
            firstName: _.trim(req.body.data.firstName),
            lastName: _.trim(req.body.data.lastName),
            fatherName: _.trim(req.body.data.fatherName),
            // password: _.trim(req.body.datapassword),
            // userType: _.trim(req.body.userType),
            phoneNumber: _.trim(req.body.data.phoneNumber),
            email: email,
            status: req.body.data.status || 0,
            DOB: _.trim(req.body.data.DOB),
            class: _.trim(req.body.data.class),
            RegNo: _.trim(req.body.data.RegNo),
            schoolName: _.trim(req.body.data.schoolName),
        };

        let accountUpdated = await SchoolUser.findOneAndUpdate({
            _id: userId
        }, {
            $set: updatedAccount
        }, {
            new: true
        });
        if (accountUpdated) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'User updated successfully.',
                data: {
                    isAccountUpdated: true
                }
            });
        } else {
            return next({
                msgCode: 1032
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1032
        });
    }
};
let updateRequestStatus = async (req, res, next) => {
    try {
        let userId = _.trim(req.body.data.studentId),
            updatedAccount = {
                status: req.body.data.status || 5,
            };

        let accountUpdated = await SchoolUser.findOneAndUpdate({
            _id: userId
        }, {
            $set: updatedAccount
        }, {
            new: true
        });
        if (accountUpdated) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'User updated successfully.',
                data: {
                    isAccountUpdated: true
                }
            });
        } else {
            return next({
                msgCode: 1032
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1032
        });
    }
};
let mediaUploaded = (req, res, next) => {
    try {
        multer.resizeAndUpload(req.files[0].location, req.files[0].key.split('1000X1000/')[1]);

        return responseModule.successResponse(res, {
            success: 1,
            message: '',
            data: {
                url: req.files[0].location
            }
        });

    } catch (err) {
        winston.error(err);
        return next(err);
    }
};
let createNewClass = async (req, res, next) => {
    try {
        let name = (req.body.data.name),
            classNo = _.trim(req.body.data.classNo);

        let newClass = new SchoolClass({
            name: name,
            classNo: classNo
        });

        newClass.save(err => {
            if (err) {
                winston.error(err);
                return next({
                    msgCode: 1037
                });
            }

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Class is created successfully.',
                data: {
                    isClassCreated: true
                }
            });

        });
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
};
let createNewSubject = async (req, res, next) => {
    try {
        let name = (req.body.data.name);
        let classNo = (req.body.data.classNo);

        let newSubject = new Subjects({
            name: name,
            class:classNo
        });

        newSubject.save(err => {
            if (err) {
                winston.error(err);
                return next({
                    msgCode: 1038
                });
            }

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Subject is created successfully.',
                data: {
                    isSubjectCreated: true
                }
            });

        });
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1038
        });
    }
};
let assignSubjectToTeacher = async (req, res, next) => {
    try {
        let subjectId = _.trim(req.body.subjectId),
            teacherId = _.trim(req.body.teacherId),
            updateSubject = {
                teacher: teacherId
            };

        let assignTeacher = await Subjects.findOneAndUpdate({
            _id: subjectId
        }, {
            $push: updateSubject
        }, {
            new: true
        });
        if (assignTeacher) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Teacher assigned to subject successfully.',
                data: {
                    isTeacherAssingned: true
                }
            });
        } else {
            return next({
                msgCode: 1039
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1039
        });
    }
};
let assignSubjectToStudent = async (req, res, next) => {
    try {
        let subjectId = _.trim(req.body.subjectId),
            studentIds = req.body.studentIds || [],
            updateSubject = {
                students: studentIds
            };

        let assignStudent = await Subjects.findOneAndUpdate({
            _id: subjectId
        }, {
            $push: updateSubject
        }, {
            new: true
        });
        if (assignStudent) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Students are assigned to subject successfully.',
                data: {
                    isStudentsAssingned: true
                }
            });
        } else {
            return next({
                msgCode: 1040
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1040
        });
    }
};
let assignSubjectToClass = async (req, res, next) => {
    try {
        let classId = _.trim(req.body.classId),
            subjectsIds = req.body.subjectsIds || [],
            updateSubject = {
                subjects: subjectsIds
            };

        let assignSubject = await SchoolClass.findOneAndUpdate({
            _id: classId
        }, {
            $push: updateSubject
        }, {
            new: true
        });
        if (assignSubject) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'subjects are assigned to class successfully.',
                data: {
                    isSubjectAssingned: true
                }
            });
        } else {
            return next({
                msgCode: 1041
            });
        }

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1040
        });
    }
};
let createNewTimeTable = async (req, res, next) => {
    try {
        let day = parseInt(req.body.data.day) || 0,
            startTime = req.body.data.startTime,
            endTime = req.body.data.startTime,
            classId = _.trim(req.body.data.classNo),
            subject = _.trim(req.body.data.subjectName);
        console.log(day, startTime, endTime, classId, subject);
        // startTime = moment.unix(startTime).format('HH:MM')
        // endTime = moment.unix(endTime).format('HH:MM')

        let newTimeTable = new TimeTable({
            day: day,
            startTime: startTime,
            endTime: endTime,
            class: classId,
            subject: subject

        });

        newTimeTable.save(err => {
            if (err) {
                winston.error(err);
                return next({
                    msgCode: 1037
                });
            }

            return responseModule.successResponse(res, {
                success: 1,
                message: 'TimeTable is created successfully.',
                data: {
                    isTimeTableCreated: true
                }
            });

        });
    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1037
        });
    }
};
const getAdmissonList = async (req, res, next) => {
    try {
        console.log('dcfvgbnjmk,l')
        let status = parseInt(req.body.status) || 0;
        const admissions = await AdmissionForm.find({
            $and: [{
                status: {
                    $eq: status
                }
            }]
        })
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Admission list fetched successfully.',
            data: {
                admissionForm: admissions
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1036
        });
    }
};
const getClassListNotInUse = async (req, res, next) => {
    try {
        let classNo = req.body.class || 5;
        let classList = await SchoolClass.find({
            classNo: classNo
        }).populate([{
            path: 'subjects',
            model: 'Subjects',
            required: true,
            populate: {
                path: 'students',
                module: 'SchoolUser',
                required: true,
                // match: {
                //     _id: ObjectId(studentId)
                // }

            }
        }]).lean();
        classList = JSON.parse(JSON.stringify(classList))
        let dataList = [];
        classList.map((item, index) => {
            console.log(item);
            if(item && item.subjects[index] && item.subjects[index].students){
            item.subjects[index].students.map((students) => {
                if (students.status != 5) {
                    dataList.push(students);
                }
            
                //   console.log( 'here is the cklasssssss',students)
            })
        }
            //    item.subjects[index].students.length = 0;
            //  delete item.subjects[0]
        })
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Class list fetched successfully.',
            data: {
                classStudent: dataList
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1036
        });
    }
};
const getClassList = async (req, res, next) => {
    try {
        let classNo = req.body.class || 5;
        let classList = await SchoolUser.find({
            class: classNo
        }).lean();
        classList = JSON.parse(JSON.stringify(classList))
        
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Class list fetched successfully.',
            data: {
                classStudent: classList
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1036
        });
    }
};
const changeAdmission = async (req, res, next) => {
    try {
        sgMail.setApiKey('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');
        let status = req.body.status || 1,
            id = req.body.id;
        console.log(status, id);
        let admissions = await AdmissionForm.findOneAndUpdate({
            _id: id
        }, {
            status: status,
        }, )

        admissions = JSON.parse(JSON.stringify(admissions))

        if (status === 1) {
            let students = await SchoolUser.create({
                "name": admissions.firstName + " " + admissions.lastName,
                "firstName": admissions.firstName,
                "lastName": admissions.lastName,
                "phoneNumber": admissions.phoneNumber,
                "password": '12345678',
                "userType": 1,
                "DOB": "22-feb-1997",
                "schoolName": "Public School",
                "status": 1,
                "class": admissions.class,
                "email": `${moment().unix()}`,
                "RegNo": `'FF'-${admissions.class}-${moment().unix()}`
            })
            console.log(students)
            await SchoolUser.create({
                "name": admissions.fatherName,
                "firstName": admissions.fatherName,
                "lastName": admissions.fatherName,
                "phoneNumber": admissions.phoneNumber,
                "password": '12345678',
                "userType": 4,
                "DOB": "22-feb-1997",
                "status": 1,
                "email": admissions.email,
                "studentId": students._id,
            })
        }
        sgMail.send({
            to: admissions.email,
            from: 'bilal.khursheed@vizteck.com',
            Subject: 'Admission status',
            html: `<html><body>
            <h1>Congratulations</h1>
            <h3>Here is your login credentials </h3>
            <p> Parent Email : ${admissions.email} </p>
            <p> Parent password : 12345678 </p>
            <p> student Email : ${students.RegNo} </p>
            <p> student password : 12345678 </p>
            </body> </html>`
        }).then(() => {
            console.log('Email sent');

        }).catch(error => {
            console.log(error.response.body);
        });
        // admissions.map((item) =>{

        // })
        return responseModule.successResponse(res, {
            success: 1,
            message: 'Admission accepted  successfully.',
            data: {
                admissions: admissions
            }
        });

    } catch (err) {
        winston.error(err);
        return next({
            msgCode: 1036
        });
    }
};

module.exports = {
    getSubAdminUsersListing,
    isEmailExists,
    createSubAdminAccount,
    getSubAdminDetail,
    updateSubAdminAccount,
    mediaUploaded,
    updateRequestStatus,
    createNewClass,
    createNewSubject,
    assignSubjectToTeacher,
    assignSubjectToStudent,
    createNewTimeTable,
    assignSubjectToClass,
    getAdmissonList,
    changeAdmission,
    getClassList

};