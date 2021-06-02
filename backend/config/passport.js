const _ = require('lodash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    SchoolUser = mongoose.model('SchoolUser');

// Admin User Login Strategy
passport.use('Admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    SchoolUser.findOne({ email: username }, (err, acct) => {
        if (err) {
            return done(err);
        }
        if (!acct) {
            return done(null, false, { message: 'This admin account doesn’t exist. Please enter a different email.' });
        }
        acct.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Invalid password.' });
            }
            return done(null, acct);
        });
    });
}));
// student  Login Strategy
passport.use('Student', new LocalStrategy({
    usernameField: 'RegNo',
    passwordField: 'password'
}, function(username, password, done) {
    SchoolUser.findOne({ RegNo: username }, (err, acct) => {
        if (err) {
            return done(err);
        }
        if (!acct) {
            return done(null, false, { message: 'This Student account doesn’t exist. Please enter a different RegNo.' });
        }
        acct.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Invalid password.' });
            }
            console.log("working")
            return done(null, acct);
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, { _id: user._id, userType: user.userType });
});

passport.deserializeUser((user, done) => {
    console.log(user)
    if (user.userType === 'user') {
        User.findById(user._id, function(err, user) {
            if (user) {
                done(err, user);
            } else {
                return done({ message: 'Unable to find user.' });
            }
        });
    } else if (user.userType === 'driver') {
        Drivers.findById(user._id, function(err, driver) {
            if (driver) {
                done(err, driver);
            } else {
                return done({ message: 'Unable to find driver.' });
            }
        });
    } else if (user.userType === 'company') {
        Companies.findById(user._id, function(err, company) {
            if (company) {
                done(err, company);
            } else {
                return done({ message: 'Unable to find company.' });
            }
        });
    } else if (user.userType === 0 || user.userType === 1 || user.userType === 2 || user.userType === 3 || user.userType === 4 || user.userType === 5 || user.userType === 6 || user.userType === 7) {
        SchoolUser.findById(user._id, function(err, adminUser) {
            if (adminUser) {
                done(err, adminUser);
            } else {
                return done({ message: 'Unable to find admin.' });
            }
        });
    } else {
        return done({ message: 'Unable to find User.' });
    }
});

// passport middlewares
passport.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next({ msgCode: 3 });
};

passport.isAuthorized = (userType) => {  // userTypes: 0 => admin, 1 =>student, 2 => teacher, 3 => employees, 4 => parents
    return (req, res, next) => {
        if (Array.isArray(userType)) {
            let isUserTypeExists = _.findIndex(userType, req.user.userType);
            if (isUserTypeExists) {
                return next();
            }
        } else {
            if (req.user.userType == userType) {
                return next();
            }
        }
        return next({ msgCode: 4 });
    };
};

// passport middlewares
passport.isAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next({ msgCode: '7022' });
};

module.exports = passport;