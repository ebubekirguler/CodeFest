var express = require('express');
var router = express.Router();

// operatör listeleme
router.get('/operators', function(req, res) {
  res.json({success: true, result: gsmOperators});
})

// tl yükleme
router.post('/', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: '' };
    if (!r.phoneNumber || !r.amount || !r.operatorCode || !gsmOperators.find(x=> x.code == r.operatorCode)) {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
        returnObject.message = r.phoneNumber + ' numarasına ' + r.amount + ' TL yüklenmiştir.';
        returnObject.success = true;
    }
    res.json(returnObject);
})

var gsmOperators = [
  {
    code: "turktelekom",
    name: "Türk Telekom"
  },
  {
    code: "vodafone",
    name: "Vodafone"
  },
  {
    code: "turkcell",
    name: "Turkcell"
  }
]
module.exports = router;
