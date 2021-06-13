 const studentUserController = require('../controller/studentuser.controller'),
    studetnMiddleWare = require('../middlewares/student.middleware'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


    module.exports = (app, version) => {
        let moduleName = '/student';
        app.get(
            version + moduleName + '/timetable',
            
            
            studentUserController.viewTimeTable
        );
        app.get(
            version + moduleName + '/subjects',
            
            
            studentUserController.fetchStudentSubjects
        );
        app.post(
            version + moduleName + '/fetch/attendance',
            
            
            studentUserController.fetchStudentAttendance
        );
        app.get(
            version + moduleName + '/fetch/marks',
            
            
            studentUserController.fetchStudentMarks
        );
        app.get(
            version + moduleName + '/fetch/mark',
            
            
            studentUserController.fetchStudentMarksBySubject
        );
        app.get(
            version + moduleName + '/fetch/online/class',
            
            
            studentUserController.fetchStudentOnlineClass
        );
        app.get(
            version + moduleName + '/fetch/fee/challan',
            
            
            studentUserController.fetchStudentFeeChallan
        );
        app.post(
            version + moduleName + '/fetch/subject/syllabus',
            
            
            studentUserController.fetchStudentStudyScheme
        );
        app.post(
            version + moduleName + '/fetch/online/exam',
            
            
            studentUserController.fetchOnlineExam
        );
        app.post(
            version + moduleName + '/data/add',
            
            
            studentUserController.addData
        );
        app.post(
            version + moduleName + '/announcements/add',
            
            
            studentUserController.announcementsAdd
        );
        app.post(
            version + moduleName + '/fetch/announcements',
            
            
            studentUserController.announcementsfetch
        );
    }


