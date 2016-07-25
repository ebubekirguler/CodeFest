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
        r.applicationClass == null ||
        r.amount == null) {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
        returnObject.message = r.name + ' ' + r.surname + ' adına ' + r.applicationClass + ' tipinde ' + r.amount + ' TL\'lik finansman başvurusu alınmıştır.';
        returnObject.success = true;
    }
    res.json(returnObject);
})
router.get('/', function (req, res) {
    var r = req.body;
    var loans = [
        { name: 'Muhammed Ömer', surname: 'Kısa', identityNumber: '11111111111', mobilePhone: '4440111', mobilePhoneAreaCode: '212', email: 'omer_kisa@mail.com', applicationClass: 'ARACBINEK2EL', amount: 55000 },
        { name: 'Ahmet Berke', surname: 'Bora', identityNumber: '26609236060', mobilePhone: '4440112', mobilePhoneAreaCode: '212', email: 'berke_bora@mail.com', applicationClass: 'ARACBINEK2EL', amount: 32500 },
        { name: 'Yusuf Ziya', surname: 'Kısa', identityNumber: '46033376620', mobilePhone: '4440113', mobilePhoneAreaCode: '212', email: 'ziya_kisa@mail.com', applicationClass: 'KONUT', amount: 320000 },
        { name: 'Defne', surname: 'Özgülcüler', identityNumber: '15100761720', mobilePhone: '4440114', mobilePhoneAreaCode: '212', email: 'defne_ozgulculer@mail.com', applicationClass: 'ISYERI', amount: 132200 },
        { name: 'Deniz', surname: 'Özgülcüler', identityNumber: '60928021198', mobilePhone: '4440115', mobilePhoneAreaCode: '212', email: 'deniz_ozgulculer@mail.com', applicationClass: 'KONUT', amount: 160000 },
        { name: 'Ceyda', surname: 'Bora', identityNumber: '53974605368', mobilePhone: '4440116', mobilePhoneAreaCode: '212', email: 'ceyda_bora@mail.com', applicationClass: 'EGITIMFINANSMANI', amount: 16500 }
    ];
    res.json({
        success: true,
        result: {
            loans: loans
        }
    });
})
router.get('/:identityNumber', function (req, res) {
    var r = req.params;
    var loans = [
        { name: 'Muhammed Ömer', surname: 'Kısa', identityNumber: '11111111111', mobilePhone: '4440111', mobilePhoneAreaCode: '212', email: 'omer_kisa@mail.com', applicationClass: 'ARACBINEK2EL', amount: 55000 },
        { name: 'Ahmet Berke', surname: 'Bora', identityNumber: '26609236060', mobilePhone: '4440112', mobilePhoneAreaCode: '212', email: 'berke_bora@mail.com', applicationClass: 'ARACBINEK2EL', amount: 32500 },
        { name: 'Yusuf Ziya', surname: 'Kısa', identityNumber: '46033376620', mobilePhone: '4440113', mobilePhoneAreaCode: '212', email: 'ziya_kisa@mail.com', applicationClass: 'KONUT', amount: 320000 },
        { name: 'Defne', surname: 'Özgülcüler', identityNumber: '15100761720', mobilePhone: '4440114', mobilePhoneAreaCode: '212', email: 'defne_ozgulculer@mail.com', applicationClass: 'ISYERI', amount: 132200 },
        { name: 'Deniz', surname: 'Özgülcüler', identityNumber: '60928021198', mobilePhone: '4440115', mobilePhoneAreaCode: '212', email: 'deniz_ozgulculer@mail.com', applicationClass: 'KONUT', amount: 160000 },
        { name: 'Ceyda', surname: 'Bora', identityNumber: '53974605368', mobilePhone: '4440116', mobilePhoneAreaCode: '212', email: 'ceyda_bora@mail.com', applicationClass: 'EGITIMFINANSMANI', amount: 16500 }
    ];

    loans = loans.filter(function (p) { return p.identityNumber == r.identityNumber });

    res.json({
        success: true,
        result: {
            loans: loans
        }
    });
})

module.exports = router;
