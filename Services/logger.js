var winston = require('winston');
var moment = require('moment');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename:'logs/' + moment().format('MM-DD-YYYY-HH') + '.log',
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ]
});

exports.requestHandler = function (req, res, next) {
	var info = {};
	info.body = req.body;
	info.params = req.params;
	info.url = req.url;
	info.method = req.method;
    logger.log('info', 'Request Logging', info);
    next();
};
