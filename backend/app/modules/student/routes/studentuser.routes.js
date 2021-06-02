const studentUserController = require('../controller/studentuser.controller'),
    studetnMiddleWare = require('../middlewares/student.middleware'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/student';
        app.get(
            version + moduleName + '/timetable',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.viewTimeTable
        );
        app.get(
            version + moduleName + '/subjects',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentSubjects
        );
        app.get(
            version + moduleName + '/fetch/attendance',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentAttendance
        );
        app.get(
            version + moduleName + '/fetch/marks',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentMarks
        );
        app.get(
            version + moduleName + '/fetch/mark',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentMarksBySubject
        );
        app.get(
            version + moduleName + '/fetch/online/class',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentOnlineClass
        );
        app.get(
            version + moduleName + '/fetch/fee/challan',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentFeeChallan
        );
    }


