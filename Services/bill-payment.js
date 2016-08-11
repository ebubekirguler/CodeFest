const express = require("express");
const router = express.Router();

const corporates = [
  {
    code: "ISKI",
    name: "İSKİ (İstanbul Su)"
  },
  {
    code: "IGDAS",
    name: "İGDAŞ (İstanbul Gaz)"
  },
  {
    code: "ENERJISA",
    name: "ENERJİSA (İstanbul Elektrik)"
  }
]

// kurum listeleme
router.get("/corporates", (req, res) => {
  res.json({success: true, result: corporates})
})

// fatura sorgulama
router.get("/", (req, res) => {
  if(!corporates.find(x => x.code == req.query.corporateCode)) {
    res.json({success: false, message: "Sorgulama yapmak istediğiniz kurum bilgisi bulunamadı."});
  }
  else {
    if(!req.query.subscriberNumber) {
      res.json({success: false, message: "Sorgulama yapmak istediğiniz abone bilgisi bulunamadı."});
    }
    else {
      let response = {};
      response.corporateCode = req.query.corporateCode;
      response.subscriberNumber = req.query.subscriberNumber;
      response.debt = 100;
      res.json({success: true, result: response});
    }
  }
})

// fatura ödeme
router.post("/", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: "" };
    if (!r.subscriberNumber || !r.debt || !r.corporateCode) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    if(!corporates.find(x=> x.code == req.body.corporateCode)) {
      res.json({success: false, message: "Ödeme yapmak istediğiniz kurum bilgisi bulunamadı."});
    }
    else {
      returnObject.message = r.subscriberNumber + " numaraya ait " + r.debt + " TL tutarındaki "+ corporates.find(x=> x.code == req.body.corporateCode).name +" faturası ödenmiştir.";
      returnObject.success = true;
    }
    res.json(returnObject);
})


module.exports = router;
