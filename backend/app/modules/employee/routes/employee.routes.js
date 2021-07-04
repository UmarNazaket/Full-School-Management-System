const employeeUserController = require('../controller/employee.controller'),
    studetnMiddleWare = require('../middlewares/employee.middleware'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/employee';
        app.post(
            version + moduleName + '/generate/fee',
            // passport.isAuthenticated,
            // passport.isAuthorized([3]),
            employeeUserController.generateStudentFee
        );
        app.get(
            version + moduleName + '/view/fee',
            // passport.isAuthenticated,
            // passport.isAuthorized([3]),
            employeeUserController.viewFeeChallan
        );
        app.put(
            version + moduleName + '/update/fee',
            // passport.isAuthenticated,
            // passport.isAuthorized([3]),
            employeeUserController.updateFeeChallan
        );
        app.post(
            version + moduleName + '/student/list',
            // passport.isAuthenticated,
            // passport.isAuthorized([3]),
            employeeUserController.studentList
        );
    }


