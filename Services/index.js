const express = require("express");
const logger = require("./logger");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(logger.requestHandler);

// auth control
app.use((req, res, next) => {
	if(req.url.toLowerCase().startsWith("/auth")){
		next();
	}
	else if(!req.headers.authorization || req.headers.authorization != "njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3") {
		let err = {}
		err.status = 401;
		err.message = "SessionNotFound"
		err.isFriendly = true;
		next(err);
	}
	else {
		next();
	}
});

app.use("/Auth", require("./auth"));
app.use("/MoneyTransfer", require("./money-transfer"));
app.use("/CoreBanking", require("./corebanking"));
app.use("/GsmPrePaid", require("./gsm-prepaid"));
app.use("/BillPayment", require("./bill-payment"));
app.use("/VirtualPos", require("./virtual-pos"));
app.use("/Loan", require("./loan"));
app.use("/CreditCard", require("./credit-card"));

// 404 handler
app.use((req, res, next) => {
	let err = {}
	err.status = 404;
	err.message = "EndPointNotFound"
	err.isFriendly = true;
	next(err);
})

// unhandled
app.use((err, req, res, next) => {
	if(err) {
		let response = {};
	  response.success = false;
		response.result = {};
		if(err.isFriendly) {
			response.message = err.message;
			res.status(err.status);
		}
		else {
			response.message = "İşleminizi şu anda gerçekleştiremiyoruz."
			res.status(500);
		}
	  res.json(response);
	}
});

const server = app.listen(3000, function () {
  console.log("CodeFest API listening at http://localhost:3000");
})
