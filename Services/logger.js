const winston = require('winston');
const moment = require('moment');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename:'logs/' + moment().format('MM-DD-YYYY-HH') + '.log',
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ]
});

exports.requestHandler = (req, res, next) => {
	let info = {};
	info.body = req.body;
	info.params = req.params;
	info.url = req.url;
	info.method = req.method;
  logger.log('info', 'Request Logging', info);
  next();
};
