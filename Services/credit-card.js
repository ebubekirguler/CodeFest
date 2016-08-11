const express = require("express");
const router = express.Router();

const cards = [
    { id: 1, cardType: "SALEPLUS", cardNumber: "1111222233334444", limit:10000, availableLimit:8000 },
    { id: 2, cardType: "SALEPLATIN", cardNumber: "5555666677778888", limit:10000, availableLimit:9000 }
];

router.post("/", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: "" };
    if (r.name == null ||
        r.surname == null ||
        r.identityNumber == null ||
        r.mobilePhone == null ||
        r.mobilePhoneAreaCode == null ||
        r.email == null ||
        r.cardType == null) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
        returnObject.message = r.name + " " + r.surname + " adına " + r.cardType + " tipindeki kart başvurusu alınmıştır.";
        returnObject.success = true;
    }
    res.json(returnObject);
})

router.get("/", (req, res) => {
    res.json({success: true, result: cards});
})

router.get("/:id/debt", (req, res) => {
  if(!cards.find(x=> x.id == req.params.id)) {
    res.json({success: false, message: "Kart bilgisi bulunamadı."});
  } else {
    let response = {};
    response.cardNumber = cards.find(x=> x.id == req.params.id).cardNumber;
    response.debt = cards.find(x=> x.id == req.params.id).limit - cards.find(x=> x.id == req.params.id).availableLimit;
    res.json({success: true, result: response});
  }
})

router.post("/payment", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: "" };
    if (!r.cardNumber || !r.amount) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
        returnObject.message = r.cardNumber + " numaralı karta ait " + r.amount + " TL\"lik borç ödemesi yapılmıştır.";
        returnObject.success = true;
    }
    res.json(returnObject);
})

module.exports = router;
