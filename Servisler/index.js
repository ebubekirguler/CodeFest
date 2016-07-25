var express = require('express');
var logger = require('./logger');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(logger.requestHandler);

// auth control
app.use(function(req, res, next) {
	if(req.url.toLowerCase().startsWith('/auth')){
		next()
	} else {
		if(!req.headers.authorization || req.headers.authorization != "njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3") {
			var err = {}
			err.status = 401;
			err.message = "SessionNotFound"
			err.isFriendly = true;
			next(err);
		}
		else
			next();
	}
});

app.use('/Auth', require('./auth'));
app.use('/MoneyTransfer', require('./money-transfer'));
app.use('/CoreBanking', require('./corebanking'));
app.use('/GsmPrePaid', require('./gsm-prepaid'));
app.use('/CardPayment', require('./card-payment'));
app.use('/BillPayment', require('./bill-payment'));
app.use('/CheckAccountBalance', require('./check-account-balance'));
app.use('/VirtualPos', require('./virtual-pos'));
app.use('/Loan', require('./loan'));
app.use('/CreditCard', require('./credit-card'));

// unhandled
app.use(function(err, req, res, next) {
	if(err) {
		var response = {};
	  	response.success = false;
		if(err.isFriendly) {
			response.message = err.message;
			res.status(err.status);
		}
		else {
			response.message = 'İşleminizi şu anda gerçekleştiremiyoruz.'
			res.status(500);
		}
		response.result = {};
	  res.json(response);
	}
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
