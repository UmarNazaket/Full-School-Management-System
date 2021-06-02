/**
 * Created by Bilal Khursheed on 5/20/2021.
 */

const adminSignInController = require('../controller/adminSignIn.controller'),
    adminMiddleWare = require('../middlewares/adminuser.middleware'),
    passport = require('../../../../../config/passport');

module.exports = (app, version) => {
    app.post(
        version + '/admin/logIn',
        adminMiddleWare.validateSignIn,
        adminSignInController.logInUser
    );

    app.get(
        version + '/admin/logOut',
        passport.isAuthenticated,
        passport.isAuthorized([0, 1, 2, 3, 4]),
        adminSignInController.logOutAccount
    );

    app.get(
        version + '/admin/currentAccount',
        passport.isAuthenticated,
        passport.isAuthorized([0, 1, 2, 3, 4]),
        adminSignInController.getCurrentAccount
    );

    app.put(
        version + '/admin/updateProfile',
        passport.isAuthenticated,
        passport.isAuthorized([0, 1, 2, 3, 4]),
        adminSignInController.updateProfile
    );
    
    app.post(
        version + '/admin/reset-password',
        passport.isAuthenticated,
        passport.isAuthorized([0, 1, 2, 3, 4]),
        adminMiddleWare.validateResetPasswordParams,
        adminSignInController.adminResetPassword
    );
};