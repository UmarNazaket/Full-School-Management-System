const teacherUserController = require('../controller/teacheruser.controller'),
    studetnMiddleWare = require('../middlewares/teacher.middleware'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/teacher';
        app.get(
            version + moduleName + '/timetable',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.viewTimeTable
        );
        app.post(
            version + moduleName + '/subjects',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.fetchTeacherSubjects
        );
        app.post(
            version + moduleName + '/add/onlineclass',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.addOnlineClass
        );
        app.get(
            version + moduleName + '/fetch/onlineclass',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.fetchOnlineClass
        );
        app.get(
            version + moduleName + '/fetch/onlineclass/:id',
            passport.isAuthenticated,
            passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.fetchOnlineClassById
        );
        app.post(
            version + moduleName + '/fetch/student/list',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.fetchStudentBySubject
        );
        app.put(
            version + moduleName + '/add/study/scheme',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.addSchemeOfStudy
        );
        app.post(
            version + moduleName + '/add/attendance',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.addAttendance
        );
        app.post(
            version + moduleName + '/add/marks',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.addStudentMarks
        );
        app.post(
            version + moduleName + '/add/online/exam',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            teacherUserController.addOnlineExam
        );
    }


