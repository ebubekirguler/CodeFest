var express = require('express');
var router = express.Router();

router.get('/sales', function (req, res) {
  var r = req.body;

  var transactions = [
      { creditCardNumber: '4500********3433', provisionNumber: '12311122', amount: '100 TL', merchantId:'5', name: 'Mustafa Tanisir', identityNumber: '11111111111'},
      { creditCardNumber: '4500********3434', provisionNumber: '12555895', amount: '500 TL', merchantId:'6', name: 'Ahmet Berke', identityNumber: '22223334455'},
      { creditCardNumber: '4500********3495', provisionNumber: '12311676', amount: '200 TL', merchantId:'7', name: 'Yusuf Ahmet', identityNumber: '77777777777'},
      { creditCardNumber: '4500********3456', provisionNumber: '12310005', amount: '800 TL', merchantId:'7', name: 'Ömer Faruk', identityNumber: '99998887765'},
      { creditCardNumber: '4500********3457', provisionNumber: '12140003', amount: '900 TL', merchantId:'2', name: 'Ebu Bekir', identityNumber: '66666666666'}
  ];
  res.json({
      success: true,
      result: {
          transactions: transactions
      }
  });
})
router.post('/sales', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: ''};
    if(r.creditCardNumber == null ||
      r.cardExpireDateYear == null ||
      r.cardExpireDateMonth == null ||
      r.CVV2 == null ||
      r.cardHolderName == null ||
      r.cardType == null ||
      r.amount == null ||
      r.merchantId == null ||
      r.installmentCount == null ||
      r.currencyCode == null)
      {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
      }
      else {
        returnObject.success = true;
        returnObject.result = {provisionNumber: 377777, orderId: 000023, installmentCount: req.body.installmentCount }
      }
      res.json(returnObject);
})
router.delete('/sales/:provisionNumber', function (req, res) {
    var r = req.body;
    var returnObject = { success: true, message: req.params.provisionNumber + ' provizyon numaralı işlem iptal edilmiştir.'};
    res.json(returnObject);
})

router.post('/postauth', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: '' };
    if(r.creditCardNumber == null ||
       r.merchantId  == null ||
       r.orderId == null ||
       r.provisionNumber == null)
    {
      returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
      returnObject.message = r.creditCardNumber + ' numaralı kredi kartına ait ' + r.provisionNumber + ' provizyon numaralı işlem için otorizasyon kapama başarıyla gerçekleştirilmiştir.';
      returnObject.success = true;
    }
    res.json(returnObject);
})
router.post('/preauth', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: ''};
    if(r.creditCardNumber == null ||
      r.cardExpireDateYear == null ||
      r.cardExpireDateMonth == null ||
      r.CVV2 == null ||
      r.cardHolderName == null ||
      r.cardType == null ||
      r.amount == null ||
      r.merchantId == null ||
      r.installmentCount == null ||
      r.currencyCode == null)
      {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
      }
      else {
        returnObject.message = r.creditCardNumber +' numaralı kredi kartından ' + r.amount + 'TL tutarında ön otorizasyon başarıyla gerçekleştirilmiştir.'+ r.installmentNumber;
        returnObject.success = true;
      }
      res.json(returnObject);
})
router.post('/refund', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: ''};
    if(r.creditCardNumber == null ||
      r.merchantId == null ||
      r.orderId == null ||
      r.provisionNumber == null)
    {
      returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
      returnObject.message = r.creditCardNumber + ' numaralı kredi kartına ait ' + r.provisionNumber + ' provizyon numaralı işlem için iade başarıyla gerçekleştirildi.';
      returnObject.success = true;
    }
  res.json(returnObject);
})

router.post('/goldscoreusage', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: '', methodName:'refund'};
    if(r.creditCardNumber == null ||
      r.cardExpireDateYear == null ||
      r.cardExpireDateMonth == null ||
      r.CVV2 == null ||
      r.cardHolderName == null ||
      r.cardType == null ||
      r.amount == null ||
      r.merchantId == null ||
      r.goldscore == null ||
      r.currencyCode == null)
    {
      returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
      returnObject.message = r.creditCardNumber + ' numaralı kredi kartına ait '
      + r.provisionNumber + ' provizyon numaralı işlem için hesabınıza tanımlı ' + r.goldscore + ' TL değerinde altın puan kullanımı gerçekleştirilmiştir';
      returnObject.success = true;
    }
  res.json(returnObject);
})
router.get('/goldscore', function (req, res) {
    var r = req.query;
    var goldscores = [
        { name: 'Muhammed Ömer', surname: 'Kısa', identityNumber: '12345', creditCardNumber: '1111222233334444', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com', score: 100 },
        { name: 'Ahmet Berke', surname: 'Bora', identityNumber: '23456', creditCardNumber: '9999555588880001', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com',  score: 40 },
        { name: 'Yusuf Ziya', surname: 'Kısa', identityNumber: '45678', creditCardNumber: '6666888822221111', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com',  score: 80 },
        { name: 'Defne', surname: 'Özgülcüler', identityNumber: '56789', creditCardNumber: '3333888855553333', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com',  score: 90 },
        { name: 'Deniz', surname: 'Özgülcüler', identityNumber: '67890', creditCardNumber: '6666333399994444', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com',  score: 45 },
        { name: 'Ceyda', surname: 'Bora', identityNumber: '34567', creditCardNumber: '2222555500006666', mobilePhone: '4440123', mobilePhoneAreaCode: '212', email: 'kthackathon@mail.com',  score: 5 }
    ];

    goldscores = goldscores.filter(function (p) { return p.identityNumber == r.identityNumber });

    res.json({
        success: true,
        result: goldscores
        
    });
})


module.exports = router;
