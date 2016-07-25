var express = require('express');
var router = express.Router();
router.post('/', function (req, res) {
    var r = req.body;
    var returnObject = { success: false, message: '' };
    if (r.number == null ||
        r.amount == null) {
        returnObject.message = 'Şuanda işleminizi gerçekleştiremiyoruz.';
    }
    else {
        returnObject.message = r.number + ' numarasına ' + r.amount + ' TL yüklenmiştir.';
        returnObject.success = true;
    }
    res.json(returnObject);
})

router.get('/:number', function (req, res) {
    var r = req.params;
    var dept = [
        { number: r.number, amount: '100' },
    ];
    res.json({
        success: true,
        result: {
            dept: dept
        }
    });
})

module.exports = router;
