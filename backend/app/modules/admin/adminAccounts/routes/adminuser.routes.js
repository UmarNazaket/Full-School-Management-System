/**
 * Created by Bilal Khursheed on 5/20/2021.
 */

const adminUserController = require('../controller/adminuser.controller'),
    adminMiddleWare = require('../middlewares/adminuser.middleware'),
    passport = require('../../../../../config/passport'),
    multer = require('../../../../../config/multer'),
    imageUpload = multer.upload(config.aws.s3.profileImageDirectory);


module.exports = (app, version) => {
    let moduleName = '/admin/subAdmin';
    app.post(
        version + moduleName + '/listing',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        adminUserController.getSubAdminUsersListing
    );

    app.post(
        version + moduleName + '/create',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminParams,
        // adminUserController.isEmailExists,
        adminUserController.createSubAdminAccount,
    );

    app.get(
        version + moduleName + '/:userId',
        passport.isAuthenticated,
        passport.isAuthorized([0, 1,2,3,4]),
        adminMiddleWare.validateSubAdminId,
        adminUserController.getSubAdminDetail,
    );

    app.post(
        version + moduleName + '/update/user',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
        // adminMiddleWare.validateSubAdminUpdate,
        adminUserController.updateSubAdminAccount,
    );

    app.put(
        version + moduleName + '/update/status',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.updateRequestStatus,
    );

    app.post(
        version + moduleName + '/create/class',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.createNewClass,
    );

    app.post(
        version + moduleName + '/create/subject',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.createNewSubject,
    );

    app.put(
        version + moduleName + '/assign/teacher/subject',
        passport.isAuthenticated,
        passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.assignSubjectToTeacher,
    );

    app.put(
        version + moduleName + '/assign/student/subject',
        passport.isAuthenticated,
        passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.assignSubjectToStudent,
    );
    
    app.post(
        version + moduleName + '/create/timetable',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.createNewTimeTable,
    );
    app.get(
        version + moduleName + '/admission/list',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.getAdmissonList,
    );
    app.post(
        version + moduleName + '/class/student',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.getClassList,
    );
    app.put(
        version + moduleName + '/admission/status',
        // passport.isAuthenticated,
        // passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.changeAdmission,
    );
    app.put(
        version + moduleName + '/assign/subject/class',
        passport.isAuthenticated,
        passport.isAuthorized([0]),
        // adminMiddleWare.validateSubAdminId,
    //    adminMiddleWare.validateSubAdminUpdate,
        adminUserController.assignSubjectToClass,
    );
    app.post(  // not using this one
        version + moduleName + '/uploadFile',
        passport.isAuthenticated,
        passport.isAuthorized(['Admin', 'SubAdmin']),
        imageUpload.array('image', 1),
        adminUserController.mediaUploaded
    );

};