const express = require("express");
const router = express.Router();

const gsmOperators = [
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

// operatör listeleme
router.get("/operators", function(req, res) {
  res.json({success: true, result: gsmOperators});
})

// tl yükleme
router.post("/", function (req, res) {
    const r = req.body;
    let returnObject = { success: false, message: "" };
    if (!r.phoneNumber || !r.amount || !r.operatorCode || !gsmOperators.find(x=> x.code == r.operatorCode)) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
        returnObject.message = r.phoneNumber + " numarasına " + r.amount + " TL yüklenmiştir.";
        returnObject.success = true;
    }
    res.json(returnObject);
})

module.exports = router;
