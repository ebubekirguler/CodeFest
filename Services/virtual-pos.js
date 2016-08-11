const express = require("express");
const router = express.Router();

router.get("/sales", (req, res) => {
  const r = req.body;
  const transactions = [
      { creditCardNumber: "4500********3433", provisionNumber: "12311122", amount: "100 TL", merchantId:"5", name: "Mustafa Tanisir", identityNumber: "11111111111"},
      { creditCardNumber: "4500********3434", provisionNumber: "12555895", amount: "500 TL", merchantId:"6", name: "Ahmet Berke", identityNumber: "22223334455"},
      { creditCardNumber: "4500********3495", provisionNumber: "12311676", amount: "200 TL", merchantId:"7", name: "Yusuf Ahmet", identityNumber: "77777777777"},
      { creditCardNumber: "4500********3456", provisionNumber: "12310005", amount: "800 TL", merchantId:"7", name: "Ömer Faruk", identityNumber: "99998887765"},
      { creditCardNumber: "4500********3457", provisionNumber: "12140003", amount: "900 TL", merchantId:"2", name: "Ebu Bekir", identityNumber: "66666666666"}
  ];
  res.json({success: true, result: transactions});
})
router.post("/sales", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: ""};
    if(!r.creditCardNumber || !r.cardExpireDateYear || !r.cardExpireDateMonth ||!r.CVV2 ||
       !r.cardHolderName || !r.cardType  || !r.amount || !r.merchantId || !r.installmentCount || !r.currencyCode) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
      }
      else {
        returnObject.success = true;
        returnObject.result = {provisionNumber: 377777, orderId: 000023, installmentCount: req.body.installmentCount }
      }
      res.json(returnObject);
})
router.delete("/sales/:provisionNumber", (req, res) => {
    const r = req.body;
    const returnObject = { success: true, message: req.params.provisionNumber + " provizyon numaralı işlem iptal edilmiştir."};
    res.json(returnObject);
})

router.post("/postauth", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: "" };
    if(!r.creditCardNumber || !r.merchantId || !r.orderId || !r.provisionNumber) {
      returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
      returnObject.message = r.creditCardNumber + " numaralı kredi kartına ait " + r.provisionNumber + " provizyon numaralı işlem için otorizasyon kapama başarıyla gerçekleştirilmiştir.";
      returnObject.success = true;
    }
    res.json(returnObject);
})
router.post("/preauth", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: ""};
    if(!r.creditCardNumber || !r.cardExpireDateYear || !r.cardExpireDateMonth ||!r.CVV2 ||
       !r.cardHolderName || !r.cardType  || !r.amount || !r.merchantId || !r.installmentCount || !r.currencyCode) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
        returnObject.message = r.creditCardNumber +" numaralı kredi kartından " + r.amount + "TL tutarında ön otorizasyon başarıyla gerçekleştirilmiştir.";
        returnObject.success = true;
    }
    res.json(returnObject);
})
router.post("/refund", (req, res) => {
    const r = req.body;
    let returnObject = { success: false, message: ""};
    if(!r.creditCardNumber || !r.merchantId || !r.orderId || !r.provisionNumber) {
      returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
      returnObject.message = r.creditCardNumber + " numaralı kredi kartına ait " + r.provisionNumber + " provizyon numaralı işlem için iade başarıyla gerçekleştirildi.";
      returnObject.success = true;
    }
  res.json(returnObject);
})

router.post("/goldscoreusage", (req, res) => {
    const r = req.body;
    var returnObject = { success: false, message: ""};
    if(!r.creditCardNumber || !r.cardExpireDateYear || !r.cardExpireDateMonth ||!r.CVV2 ||
       !r.cardHolderName || !r.cardType || !r.amount || !r.merchantId || !r.goldScore || !r.currencyCode) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
      returnObject.message = r.creditCardNumber + " numaralı kredi kartına ait provisionNumber: 67867 provizyon numaralı işlem için hesabınıza tanımlı " + r.goldScore + " TL değerinde altın puan kullanımı gerçekleştirilmiştir";
      returnObject.success = true;
    }
  res.json(returnObject);
})
router.get("/goldscore", (req, res) => {
    const r = req.query;
    let goldscores = [
        { name: "Muhammed Ömer", surname: "Kısa", identityNumber: "12345", creditCardNumber: "1111222233334444", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com", goldScore: 100 },
        { name: "Ahmet Berke", surname: "Bora", identityNumber: "23456", creditCardNumber: "9999555588880001", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com",  goldScore: 40 },
        { name: "Yusuf Ziya", surname: "Kısa", identityNumber: "45678", creditCardNumber: "6666888822221111", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com",  goldScore: 80 },
        { name: "Defne", surname: "Özgülcüler", identityNumber: "56789", creditCardNumber: "3333888855553333", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com",  goldScore: 90 },
        { name: "Deniz", surname: "Özgülcüler", identityNumber: "67890", creditCardNumber: "6666333399994444", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com",  goldScore: 45 },
        { name: "Ceyda", surname: "Bora", identityNumber: "34567", creditCardNumber: "2222555500006666", mobilePhone: "4440123", mobilePhoneAreaCode: "212", email: "kthackathon@mail.com",  goldScore: 5 }
    ];

    goldscores = goldscores.filter(function (p) { return p.identityNumber == r.identityNumber });
    res.json({success: true, result: goldscores});
})

module.exports = router;
