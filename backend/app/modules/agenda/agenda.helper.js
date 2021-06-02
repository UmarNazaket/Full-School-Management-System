/**
 * Created by Raza Tayyab on 7/14/2017.
 */


const Agenda = require('agenda'),
    winston = require('../../../config/winston');

let agenda = new Agenda({ db: { address: config.mongodb.host + config.mongodb.db_name } });

let pushJob = (data, type) => {
    agenda.now('pushNotification', { type: type, notificationInfo: data });
};

let postRentACarJob = (jobData) => {
    agenda.now('RentACarJobPosting', jobData);
    winston.info('Rend A Car Agenda Save Successfully.');
};

module.exports = {
    pushJob,
    postRentACarJob
};