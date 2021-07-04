 const studentUserController = require('../controller/studentuser.controller'),
    studetnMiddleWare = require('../middlewares/student.middleware'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/student';
        app.post(
            version + moduleName + '/timetable',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.viewTimeTable
        );
        app.post(
            version + moduleName + '/subjects',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentSubjects
        );
        app.post(
            version + moduleName + '/fetch/attendance',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentAttendance
        );
        app.post(
            version + moduleName + '/fetch/marks',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentMarks
        );
        app.post(
            version + moduleName + '/fetch/mark',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentMarksBySubject
        );
        app.post(
            version + moduleName + '/fetch/online/class',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentOnlineClass
        );
        app.post(
            version + moduleName + '/fetch/fee/challan',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentFeeChallan
        );
        app.post(
            version + moduleName + '/fetch/subject/syllabus',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchStudentStudyScheme
        );
        app.post(
            version + moduleName + '/fetch/online/exam',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.fetchOnlineExam
        );
        app.post(
            version + moduleName + '/data/add',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.addData
        );
        app.post(
            version + moduleName + '/announcements/add',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.announcementsAdd
        );
        app.post(
            version + moduleName + '/order',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.addOrder
        );
        app.post(
            version + moduleName + '/fetch/announcements',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.announcementsfetch
        );
        app.post(
            version + moduleName + '/paper/upload',
            // passport.isAuthenticated,
            // passport.isAuthorized([0, 1,2,3,4]),
            studentUserController.addStudentPaper
        );
    }


