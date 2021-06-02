/**
 * Created by Raza Tayyab on 6/21/2017.
 */
const responseModule = require('../../../../../config/response'),
    winston = require('../../../../../config/winston'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    _ = require('lodash'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    SchoolUser = mongoose.model('SchoolUser');

let logInUser = (req, res, next) => {
    if(req.body.hasOwnProperty('RegNo')){
        passport.authenticate('Student', (err, acct, info) => {
            if (err) {
                return next(err);
            }
            if (!acct) {
                return next(info);
            }
            req.logIn(acct, (err) => {
                if (err) {
                    return next(err);
                }
    
                return responseModule.successResponse(res, {
                    success: 1,
                    message: 'Student logged in successfully.',
                    data: {
                        _id: req.user._id,
                        name: req.user.name,
                        firstName: req.user.firstName,
                        lastName: req.user.lastName,
                        phoneNumber: req.user.phoneNumber,
                        email: req.user.email,
                        userType: req.user.userType,
                        DOB: req.user.DOB,
                        schoolName: req.user.schoolName,
                        phoneNumber: req.user.phoneNumber,
                        status: req.user.status,
                        RegNo: req.user.RegNo,
                        class: req.user.class,
                        updatedAt: req.user.updatedAt,
                        createdAt: req.user.createdAt,
                        
                    }
                });
            });
        })(req, res, next);
    }else{
    passport.authenticate('Admin', (err, acct, info) => {
        if (err) {
            return next(err);
        }
        if (!acct) {
            return next(info);
        }
        req.logIn(acct, (err) => {
            if (err) {
                return next(err);
            }

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Admin logged in successfully.',
                data: {
                    _id: req.user._id,
                    name: req.user.name,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    countryCode: req.user.countryCode,
                    phoneNumber: req.user.phoneNumber,
                    email: req.user.email,
                    userType: req.user.userType,
                    DOB: req.user.DOB,
                    schoolName: req.user.schoolName,
                    phoneNumber: req.user.phoneNumber,
                    status: req.user.status,
                    updatedAt: req.user.updatedAt,
                    createdAt: req.user.createdAt,
                    
                }
            });
        });
    })(req, res, next);
}
};

let logOutAccount = (req, res, next) => {

    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.logOut();
    });

    responseModule.successResponse(res, {
        success: 1,
        message: 'Admin user has been logout successfully.',
        data: {}
    });
};

let getCurrentAccount = (req, res, next) => {
    return res.json({
        success: 1,
        response: 200,
        data: req.user ? {
            _id: req.user._id,
            name: req.user.name,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            countryCode: req.user.countryCode,
            phoneNumber: req.user.phoneNumber,
            email: req.user.email,
            userType: req.user.userType,
            DOB: req.user.DOB,
            schoolName: req.user.schoolName,
            phoneNumber: req.user.phoneNumber,
            status: req.user.status,
            updatedAt: req.user.updatedAt,
            createdAt: req.user.createdAt,
       
        } : {}

    });
};

const adminResetPassword = async (req, res, next) => {
    try {
        const _id = req.user._id,
            newPassword = req.body.password;
        let user = await SchoolUser.findById(_id);

        if (user) {
            let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            let hash = await bcrypt.hash(newPassword, salt);

            await SchoolUser.updateOne({ _id: req.user._id }, { $set: { password: hash } });

            return responseModule.successResponse(res, {
                success: 1,
                message: 'Profile password updated successfully.',
                data: { isProfileUpdated: true }
            });

        } else {
            return next({ msgCode: 7005 });
        }
    } catch (err) {
        winston.error(err);
        return next({ msgCode: 7006 });
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const adminId = req.user._id,
            updateObj = _.pick(req.body, ['firstName', 'lastName', , 'phoneNumber']),
            filter = { _id: adminId },
            update = { $set: updateObj },
            projection = { name: 1, firstName: 1, lastName: 1,  phoneNumber: 1 };

        if (req.body.password && _.trim(req.body.password) !== '') {
            let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            updateObj.password = await bcrypt.hash(_.trim(req.body.password), salt);
        }

        updateObj.name = updateObj.firstName + ' ' + updateObj.lastName;

        const updateAdmin = await SchoolUser.findOneAndUpdate(filter, update, { projection: projection, new: true });

        if (updateAdmin) {
            return responseModule.successResponse(res, {
                success: 1,
                message: 'Profile updated successfully.',
                data: { isUpdated: true }
            });
        } else {
            return next({ msgCode: 7005 });
        }
    } catch (err) {
        return next({ msgCode: 7007 });
    }
};


module.exports = {
    logInUser,
    logOutAccount,
    getCurrentAccount,
    adminResetPassword,
    updateProfile,
};