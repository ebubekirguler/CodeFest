const express = require("express");
const router = express.Router();
const moment = require("moment");

router.post("", (req, res) => {
    if(req.body.accountNumber && req.body.password) {
    	let response = {};
    	response.accessToken = "njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3";
    	response.expires = moment(Date.now()+180000000).format("MM-DD-YYYY-HH:mm");
    	res.json({ success: true, message: "", result: response});
    }
    else {
      res.json({ success: false, message: "Şuanda işleminizi gerçekleştiremiyoruz."});
	}
});

module.exports = router;
