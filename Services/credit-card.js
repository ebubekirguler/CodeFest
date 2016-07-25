var express = require('express');
var router = express.Router();
router.post('/', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: '' };
    if (r.name == null ||
        r.surname == null ||
        r.identityNumber == null ||
        r.mobilePhone == null ||
        r.mobilePhoneAreaCode == null ||
        r.email == null ||
        r.cardType == null) {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
        returnObject.message = r.name + ' ' + r.surname + ' adına ' + r.cardType + ' tipindeki kart başvurusu alınmıştır.';
        returnObject.success = true;
    }
    res.json(returnObject);
})

router.get('/', function (req, res) {
    var r = req.params;
    var cards = [
        { name: 'Muhammed Ömer', surname: 'Kısa', identityNumber: '11111111111', mobilePhone: '4440111', mobilePhoneAreaCode: '212', email: 'omer_kisa@mail.com', cardType: 'SALEPLUS' },
        { name: 'Ahmet Berke', surname: 'Bora', identityNumber: '26609236060', mobilePhone: '4440112', mobilePhoneAreaCode: '212', email: 'berke_bora@mail.com', cardType: 'SALEPLATIN' },
    ];
    res.json({
        success: true,
        result: cards
    });
})
router.get('/:identityNumber', function (req, res) {
    var r = req.params;
    var cards = [
        { name: 'Muhammed Ömer', surname: 'Kısa', identityNumber: '11111111111', mobilePhone: '4440111', mobilePhoneAreaCode: '212', email: 'omer_kisa@mail.com', cardType: 'SALEPLUS' },
        { name: 'Ahmet Berke', surname: 'Bora', identityNumber: '26609236060', mobilePhone: '4440112', mobilePhoneAreaCode: '212', email: 'berke_bora@mail.com', cardType: 'SALEPLATIN' },
    ];
    if (r.identityNumber != null) {
        cards = cards.filter(function (p) { return p.identityNumber == r.identityNumber }
        );
    }
    res.json({
        success: true,
        result: cards
    });
})

module.exports = router;
