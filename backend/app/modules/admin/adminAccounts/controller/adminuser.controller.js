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
    TimeTable = mongoose.model('TimeTable');

const getSubAdminUsersListing = async (req, res, next) => {
    try {
        const offset = (req.body.offset) ? parseInt(req.body.offset) : 0,
            limit = (req.body.limit) ? parseInt(req.body.limit) : 0,
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
        let name = _.trim(req.body.firstName) + '' + _.trim(req.body.lastName),
            email = _.trim(req.body.email).toLowerCase(),
            studentId;
            // studentId = _.trim(req.body.studentId);

        if (parseInt(req.body.userType) === 1) {
            email = req.body.RegNo
        }
        if (parseInt(req.body.userType) === 4) {
          studentId = req.body.studentId
        }
        let newAdminUser = new SchoolUser({
            name: name,
            firstName: _.trim(req.body.firstName),
            lastName: _.trim(req.body.lastName),
            fatherName: _.trim(req.body.fatherName),
            password: _.trim(req.body.password),
            userType: _.trim(req.body.userType),
            phoneNumber: _.trim(req.body.phoneNumber),
            email: email,
            status: req.body.status || 0,
            DOB: _.trim(req.body.DOB),
            studentId: studentId,
            // class: _.trim(req.body.class),
            RegNo: _.trim(req.body.RegNo),
            schoolName: _.trim(req.body.schoolName),
        });

        newAdminUser.save(err => {
            if (err) {
                winston.error(err);
                return next({
                    msgCode: 1033
                });
            }

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
        let userId = _.trim(req.params.userId),
            name = _.trim(req.body.firstName) + '' + _.trim(req.body.lastName),
            email = _.trim(req.body.email).toLowerCase();
        if (parseInt(req.body.userType) === 1) {
            email = req.body.RegNo
        }
        let updatedAccount = {
            name: name,
            firstName: _.trim(req.body.firstName),
            lastName: _.trim(req.body.lastName),
            fatherName: _.trim(req.body.fatherName),
            password: _.trim(req.body.password),
            userType: _.trim(req.body.userType),
            phoneNumber: _.trim(req.body.phoneNumber),
            email: email,
            status: req.body.status || 0,
            DOB: _.trim(req.body.DOB),
            class: _.trim(req.body.class),
            RegNo: _.trim(req.body.RegNo),
            schoolName: _.trim(req.body.schoolName),
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
        let userId = _.trim(req.params.userId),
            updatedAccount = {
                status: req.body.status,
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
        let name = (req.body.name),
            classNo = _.trim(req.body.classNo);

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
        let name = (req.body.name);

        let newSubject = new Subjects({
            name: name,
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
        let day = parseInt(req.body.day) || 0,
            startTime = req.body.startTime,
            endTime = req.body.endTime,
            classId = _.trim(req.body.classId),
            subjectId = _.trim(req.body.subjectId);

            startTime = moment.unix(startTime).format('HH:MM')
            endTime = moment.unix(endTime).format('HH:MM')

        let newTimeTable = new TimeTable({
            day: day,
            startTime: startTime,
            endTime: endTime,
            class: classId,
            subject: subjectId

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
    assignSubjectToClass

};