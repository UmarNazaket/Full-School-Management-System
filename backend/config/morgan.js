const morgan = require('morgan'),
    chalk = require('chalk');

// Setup Console Logging
morgan.token('remote-user', (req, res) => {
    if (req.user) {
        if (req.user.userType === 'user') {
            return '{userId: ' + req.user._id + ' &name: ' + req.user.name + '}';
        } else if (req.user.userType === 'driver') {
            return '{driverId: ' + req.user._id + ' &name: ' + req.user.name + '}';
        } else if (req.user.userType === 'Admin' || req.user.userType === 'SubAdmin') {
            return '{adminId: ' + req.user._id + ' &name: ' + req.user.name + '}';
        }
    } else {
        return 'Guest';
    }
});

// app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
const morganChalk = morgan(function(tokens, req, res) {
    return [
        chalk.green.bold(tokens.date(req, res, 'iso')),
        chalk.blue.bold(tokens['remote-addr'](req, res)),
        chalk.yellow.bold(tokens['remote-user'](req, res)),
        chalk.green.bold(tokens.method(req, res)),
        chalk.blue.bold(tokens.url(req, res)),
        chalk.red.bold(tokens.status(req, res)),
        chalk.blue.bold(tokens.res(req, res, 'content-length')),
        chalk.yellow.bold(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
});

module.exports = {
    morganChalk
};