const express = require("express");
const router = express.Router();

// para gönder
router.post("/", (req, res) => {
    const request = req.body;
    const tranReference = 11223344;
    let response = {};

    response.success = true;
    response.message = request.receiverPhoneNumber + " numaralı telefona " + request.amount + " TL transfer edilmiştir. Referans numaranız: " + tranReference;
    response.result = {
       receiverPhoneNumber : request.receiverPhoneNumber,
       senderPhoneNumber : request.senderPhoneNumber,
       amount : request.amount,
       tranReference : tranReference
    }
    res.json(response);
})

// para iste
router.post("/Request", (req, res) => {
    const request = req.body;
    let response = {};
    const tranReference = 11223344;

    response.sucess = true;
    response.message = request.senderPhoneNumber + " numaralı telefondan " + request.amount + " TL tutarında para istenmiştir. Referans numaranız: " + tranReference;
    response.result = {
       receiverPhoneNumber : request.receiverPhoneNumber,
       senderPhoneNumber : request.senderPhoneNumber,
       amount : request.amount,
       tranReference : tranReference
    }

    res.json(response);
});

// para iste
router.post("/Confirm", (req, res) => {
    const request = req.body;
    let response = {};

    response.sucess = true;
    response.message = "5555555555 numaralı telefona 100 TL tutarında para gönderilmiştir. Referans numaranız: " + request.tranReference;
    response.result = {
       receiverPhoneNumber : 5555555555,
       amount : 100,
       tranReference : request.tranReference
    }

    res.json(response);
});

// iptal et
router.delete("/:tranReference", (req, res) => {
    const request = req.params;
    let response = {};

    response.success = true;
    response.message = request.tranReference + " referans numaralı işleminiz iptal edilmiştir."
    response.result = {
       tranReference : request.tranReference
    }

    res.json(response);
})

// hareket listele
// type S: gönderildi W: beklemede C: iptal edildi.
router.get("/", (req, res) => {
    let response = {};

    response.success = true;
    response.result = {
       activities :[
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "01/01/2016 11:30",
           tranType : "Para Gönderme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "02/02/2016 11:30",
           tranType : "Para İsteme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "03/03/2016 11:30",
           tranType : "Para Gönderme",
           status : "C"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "01/03/2016 11:30",
           tranType : "Para Gönderme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "02/03/2016 11:30",
           tranType : "Para Gönderme",
           status : "W"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "02/04/2016 11:30",
           tranType : "Para İsteme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "04/04/2016 11:30",
           tranType : "Para Gönderme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "02/06/2016 11:30",
           tranType : "Para Gönderme",
           status : "S"
         },
         {
           senderPhoneNumber : "5555555555",
           receiverPhoneNumber : "5000000000",
           tranReference : 1,
           tranDate : "06/02/2016 11:30",
           tranType : "Para Gönderme",
           status : "S"
         }
       ]
     };

    res.json(response);
})

module.exports = router;
