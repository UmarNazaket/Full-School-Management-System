const parentUserController = require('../controller/parent.controller'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/parent';
        app.post(
            version + moduleName + '/admission',
            // passport.isAuthenticated,
            // passport.isAuthorized([3]),
            parentUserController.generateStudentAdmission
        );
        app.get(
            version + moduleName + '/view/child',
            // // passport.isAuthenticated,
            // passport.isAuthorized([4]),
            parentUserController.listofBachas
        );
        app.post(
            version + moduleName + '/view/student/data',
            // // passport.isAuthenticated,
            // passport.isAuthorized([4]),
            parentUserController.viewStudentRecord
        );
        // app.put(
        //     version + moduleName + '/update/fee',
        //     passport.isAuthenticated,
        //     passport.isAuthorized([3]),
        //     employeeUserController.updateFeeChallan
        // );
    }


