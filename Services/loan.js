const express = require("express");
const router = express.Router();

const loans = [
    {applicationClass: "ARACBINEK2EL", amount: 55000 },
    {applicationClass: "ARACBINEK2EL", amount: 32500 },
    {applicationClass: "KONUT", amount: 320000 },
    {applicationClass: "ISYERI", amount: 132200 },
    {applicationClass: "KONUT", amount: 160000 },
    {applicationClass: "EGITIMFINANSMANI", amount: 16500 }
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
        r.applicationClass == null ||
        r.amount == null) {
        returnObject.message = "Şuanda işleminizi gerçekleştiremiyoruz.";
    }
    else {
        returnObject.message = r.name + " " + r.surname + " adına " + r.applicationClass + " tipinde " + r.amount + " TL\"lik finansman başvurusu alınmıştır.";
        returnObject.success = true;
    }
    res.json(returnObject);
})

router.get("/", (req, res) => {
    res.json({success: true, result: loans});
})

module.exports = router;
