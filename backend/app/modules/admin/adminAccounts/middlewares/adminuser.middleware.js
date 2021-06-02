/**
 * Created by Raza Tayyab on 22/03/2021.
 */

const commonLib = require('../../../globals/global.library'),
    { check } = require('express-validator');

let validateSignIn = async (req, res, next) => {
    if(req.body.hasOwnProperty('email')){
    await check('email').notEmpty().withMessage(5005).run(req);
    }
    await check('password').notEmpty().withMessage(5031).run(req);

    return commonLib.getValidationResult('Admin SignIn: ', req, res, next);
};

let validateAdminProfileId = async (req, res, next) => {
    await check('adminId').notEmpty().withMessage(1002).run(req);
    await check('adminId').isMongoId().withMessage(1003).run(req);

    return commonLib.getValidationResult('Admin Id Validation : ', req, res, next);
};

const validateResetPasswordParams = async (req, res, next) => {
    await check('password').notEmpty().withMessage(1004).run(req);
    return commonLib.getValidationResult('Reset Password Validation: ', req, res, next);
};

let validateSubAdminParams = async (req, res, next) => {
    // await check('email').notEmpty().withMessage(1008).run(req);
    await check('firstName').notEmpty().withMessage(1009).run(req);
    await check('lastName').notEmpty().withMessage(1010).run(req);
    // await check('profileImageUrl').notEmpty().withMessage(1011).run(req);
    // await check('countryCode').notEmpty().withMessage(1012).run(req);
    // await check('phoneNumber').notEmpty().withMessage(1013).run(req);
    // await check('password').notEmpty().withMessage(1014).run(req);
    // await check('dashboard').notEmpty().withMessage(1015).run(req);
    // await check('map').notEmpty().withMessage(1016).run(req);
    // await check('companies').notEmpty().withMessage(1017).run(req);
    // await check('drivers').notEmpty().withMessage(1018).run(req);
    // await check('users').notEmpty().withMessage(1019).run(req);
    // await check('jobs').notEmpty().withMessage(1020).run(req);
    // await check('promoCodes').notEmpty().withMessage(1021).run(req);
    // await check('promotions').notEmpty().withMessage(1022).run(req);
    // await check('configurations').notEmpty().withMessage(1023).run(req);
    // await check('rolesAndSecurity').notEmpty().withMessage(1024).run(req);
    // await check('banks').notEmpty().withMessage(1025).run(req);
    // await check('payouts').notEmpty().withMessage(1026).run(req);
    // await check('notifications').notEmpty().withMessage(1027).run(req);
    await check('status').notEmpty().withMessage(1034).run(req);
    // await check('status').isBoolean().withMessage(1034).run(req);

    return commonLib.getValidationResult('SubAdmin Validation: ', req, res, next);
};

let validateSubAdminId = async (req, res, next) => {
    await check('userId').notEmpty().withMessage(1028).run(req);
    await check('userId').isMongoId().withMessage(1029).run(req);
    return commonLib.getValidationResult('userId Id Validation: ', req, res, next);
};

let validateSubAdminUpdate = async (req, res, next) => {
    await check('firstName').notEmpty().withMessage(1009).run(req);
    await check('lastName').notEmpty().withMessage(1010).run(req);
    // await check('profileImageUrl').notEmpty().withMessage(1011).run(req);
    // await check('countryCode').notEmpty().withMessage(1012).run(req);
    await check('phoneNumber').notEmpty().withMessage(1013).run(req);
    // await check('dashboard').notEmpty().withMessage(1015).run(req);
    // await check('map').notEmpty().withMessage(1016).run(req);
    // await check('companies').notEmpty().withMessage(1017).run(req);
    // await check('drivers').notEmpty().withMessage(1018).run(req);
    // await check('users').notEmpty().withMessage(1019).run(req);
    // await check('jobs').notEmpty().withMessage(1020).run(req);
    // await check('promoCodes').notEmpty().withMessage(1021).run(req);
    // await check('promotions').notEmpty().withMessage(1022).run(req);
    // await check('configurations').notEmpty().withMessage(1023).run(req);
    // await check('rolesAndSecurity').notEmpty().withMessage(1024).run(req);
    // await check('banks').notEmpty().withMessage(1025).run(req);
    // await check('payouts').notEmpty().withMessage(1026).run(req);
    // await check('notifications').notEmpty().withMessage(1027).run(req);
    await check('status').notEmpty().withMessage(1034).run(req);
    // await check('status').isBoolean().withMessage(1034).run(req);

    return commonLib.getValidationResult('SubAdmin Update Validation: ', req, res, next);
};

module.exports = {
    validateSignIn,
    validateAdminProfileId,
    validateResetPasswordParams,
    validateSubAdminParams,
    validateSubAdminId,
    validateSubAdminUpdate,
};