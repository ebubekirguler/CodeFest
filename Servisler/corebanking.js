var express = require('express');
var router = express.Router();


router.post('/qr', function (req, res) {
    if(req.body.amount) {
    	res.json({ success: true, message: req.body.amount + ' TL tutarındaki işleminize ATM üzerinden devam edebilirsiniz.'});
    }
    else {
		res.json({ success: false, message: 'Şuanda işleminizi gerçekleştiremiyoruz.'});
	}

})

router.get('/fecs', function (req, res) {
    res.json({ success: true, result: fecList});
})

router.get('/fxrates', function (req, res) {
    res.json({ success: true, result: fxRates});
})

router.get('/fxrates/:fecId', function (req, res) {
    getFXRate(req.params.fecId, function(rate) {
        res.json({ success: true, result: rate});
    }, function(err) {
        res.status(404).json({ success: false, result: null});
    })
})

router.get('/atms', function (req, res) {
    res.json({ success: true, result: atmList});
})



module.exports = router;


getFXRate = function(fecId, onSuccess, onError) {
    var fxRate;
    fxRates.forEach(function(rate) {
        if(rate.FecId == fecId)
            fxRate = rate;
    });
    if(fxRate){
        onSuccess(fxRate);
    }else {
        onError("NotFound");
    }
};

var fecList = [
         {
            "FecId": "0",
            "FecCode": "TL",
            "FecName": "Türk Lirası"
         },
         {
            "FecId": "1",
            "FecCode": "USD",
            "FecName": "Amerikan Doları"
         },
         {
            "FecId": "2",
            "FecCode": "AUD",
            "FecName": "Avustralya Doları"
         },
         {
            "FecId": "3",
            "FecCode": "ATS",
            "FecName": "Avusturya Şilini"
         },
         {
            "FecId": "4",
            "FecCode": "DEM",
            "FecName": "D.Alman Markı"
         },
         {
            "FecId": "5",
            "FecCode": "BEF",
            "FecName": "Belçika Frangı"
         },
         {
            "FecId": "6",
            "FecCode": "DKK",
            "FecName": "Danimarka Kronu"
         },
         {
            "FecId": "7",
            "FecCode": "FRF",
            "FecName": "Fransız Frangı"
         },
         {
            "FecId": "8",
            "FecCode": "NLG",
            "FecName": "Hollanda Florini"
         },
         {
            "FecId": "9",
            "FecCode": "SEK",
            "FecName": "İsveç Kronu"
         },
         {
            "FecId": "10",
            "FecCode": "CHF",
            "FecName": "İsviçre Frangı"
         },
         {
            "FecId": "11",
            "FecCode": "ITL",
            "FecName": "İtalyan Lireti 100"
         },
         {
            "FecId": "12",
            "FecCode": "CAD",
            "FecName": "Kanada Doları"
         },
         {
            "FecId": "13",
            "FecCode": "KWD",
            "FecName": "Kuveyt Dinarı"
         },
         {
            "FecId": "14",
            "FecCode": "NOK",
            "FecName": "Norveç Kronu"
         },
         {
            "FecId": "15",
            "FecCode": "GBP",
            "FecName": "İngiliz Sterlini"
         },
         {
            "FecId": "16",
            "FecCode": "SAR",
            "FecName": "Suudi Arabistan Riyali"
         },
         {
            "FecId": "17",
            "FecCode": "JPY",
            "FecName": "Japon Yeni"
         },
         {
            "FecId": "18",
            "FecCode": "FIM",
            "FecName": "Fin Markkası"
         },
         {
            "FecId": "19",
            "FecCode": "EUR",
            "FecName": "Euro"
         },
         {
            "FecId": "20",
            "FecCode": "ESP",
            "FecName": "İspanyol Pesetası"
         },
         {
            "FecId": "21",
            "FecCode": "IEP",
            "FecName": "İrlanda Lirası"
         },
         {
            "FecId": "22",
            "FecCode": "LUF",
            "FecName": "Lüksemburg Frangı"
         },
         {
            "FecId": "23",
            "FecCode": "PTE",
            "FecName": "Portekiz Esküdosu"
         },
         {
            "FecId": "24",
            "FecCode": "ALT (gr)",
            "FecName": "Altın"
         },
         {
            "FecId": "25",
            "FecCode": "BHD",
            "FecName": "Bahreyn Dinarı"
         },
         {
            "FecId": "26",
            "FecCode": "GMS (gr)",
            "FecName": "Gümüş"
         },
         {
            "FecId": "27",
            "FecCode": "PLT (gr)",
            "FecName": "Platin"
         },
         {
            "FecId": "28",
            "FecCode": "ALM (ton)",
            "FecName": "Alüminyum"
         },
         {
            "FecId": "29",
            "FecCode": "AED",
            "FecName": "Birleşik Arap Emirlikleri Dirhemi"
         },
         {
            "FecId": "30",
            "FecCode": "RUB",
            "FecName": "Rus Rublesi"
         },
         {
            "FecId": "31",
            "FecCode": "CU (ton)",
            "FecName": "Bakır"
         },
         {
            "FecId": "32",
            "FecCode": "ZN (ton)",
            "FecName": "Çinko"
         },
         {
            "FecId": "33",
            "FecCode": "NI (ton)",
            "FecName": "Nikel"
         },
         {
            "FecId": "34",
            "FecCode": "PB (ton)",
            "FecName": "Kurşun"
         },
         {
            "FecId": "35",
            "FecCode": "SN (ton)",
            "FecName": "Kalay"
         },
         {
            "FecId": "36",
            "FecCode": "CNY",
            "FecName": "Çin Yuanı"
         },
         {
            "FecId": "37",
            "FecCode": "QAR",
            "FecName": "Katar Riyali"
         },
         {
            "FecId": "38",
            "FecCode": "PLD (gr)",
            "FecName": "Paladyum"
         },
         {
            "FecId": "39",
            "FecCode": "CAG (gr)",
            "FecName": "Cumhuriyet Altını Grubu (22 ayar)"
         },
         {
            "FecId": "40",
            "FecCode": "ZCeyrek",
            "FecName": "Çeyrek Altın (22 ayar)"
         },
         {
            "FecId": "50",
            "FecCode": "MYR",
            "FecName": "Malezya Ringiti"
         },
         {
            "FecId": "51",
            "FecCode": "CZK",
            "FecName": "Çek Korunası"
         },
         {
            "FecId": "52",
            "FecCode": "SGD",
            "FecName": "Singapur Doları"
         },
         {
            "FecId": "53",
            "FecCode": "PHP",
            "FecName": "Filipinler Pesosu"
         }
         ];
var atmList = 
    [
         {
            "Code": "KT34A001",
            "Name": "MERKEZ ŞUBE ATM",
            "Address": "BÜYÜKDERE CAD. NO:129",
            "City": "İSTANBUL",
            "Town": "ŞİŞLİ",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "41.068135",
            "Latitude": "29.0049173",
            "Type": "ATM"
         },
         {
            "Code": "KT41B284",
            "Name": "ŞEKERPINAR 2.ATM",
            "Address": "CUMHURIYET MAH. ÖZGÜRLÜK CAD. NO:11/A  ŞEKERPINAR",
            "City": "KOCAELI",
            "Town": "ÇAYIROVA",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "40.868779,",
            "Latitude": "29.3789743",
            "Type": "ATM"
         },
         {
            "Code": "KT06A003",
            "Name": "ANKARA",
            "Address": "ŞEHİT TEĞMEN KALMAZ CAD. NO:17/A",
            "City": "ANKARA",
            "Town": "ALTINDAĞ",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "39.9400679",
            "Latitude": "32.8539879",
            "Type": "ATM"
         },
         {
            "Code": "KT38A023",
            "Name": "KAYSERİ ATM",
            "Address": "MİLLET CAD. ÜNLÜ APT. NO:39",
            "City": "KAYSERI",
            "Town": "MELİKGAZİ",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "38.7180985",
            "Latitude": "35.4865481",
            "Type": "ATM"
         },
         {
            "Code": "KT34A004",
            "Name": "KADIKÖY",
            "Address": "SÖĞÜTLÜÇEŞME CAD. BAŞÇAVUŞ SOK. NO:57/2",
            "City": "İSTANBUL",
            "Town": "KADIKÖY",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "40.9787401",
            "Latitude": "29.0404937",
            "Type": "ATM"
         },
         {
            "Code": "KT41D284",
            "Name": "KTBÜ-2",
            "Address": "CUMHURIYET CAD., ÖZGÜRLÜK MAH. NO:11/A",
            "City": "KOCAELI",
            "Town": "ÇAYIROVA",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "0",
            "HasGold": "1",
            "Longitude": "40.8674485",
            "Latitude": "29.3786163",
            "Type": "ATM"
         },
        {
            "Code": "X3409719",
            "Name": "XTM KİRAZLI",
            "Address": "KİRAZLI MAH.HOCA AHMET YASEVI CAD.NO:68/B",
            "City": "İSTANBUL",
            "Town": "BAĞCILAR",
            "HasCoin": "1",
            "HasTL": "1",
            "HasUSD": "1",
            "HasEuro": "1",
            "HasGold": "1",
            "Longitude": "41.032258",
            "Latitude": "28.8453543",
            "Type": "XTM"
        }         
      ]
var fxRates =  [
         {
            "FecId": "1",
            "FecCode": "USD",
            "FecName": "Amerikan Doları",
            "CurrencyAsk": "2.97611",
            "CurrencyBid": "2.95683"
         },
         {
            "FecId": "2",
            "FecCode": "AUD",
            "FecName": "Avustralya Doları",
            "CurrencyAsk": "2.26075",
            "CurrencyBid": "2.23422"
         },
         {
            "FecId": "3",
            "FecCode": "ATS",
            "FecName": "Avusturya Şilini",
            "CurrencyAsk": "0.23949",
            "CurrencyBid": "0.23770"
         },
         {
            "FecId": "4",
            "FecCode": "DEM",
            "FecName": "D.Alman Markı",
            "CurrencyAsk": "1.68494",
            "CurrencyBid": "1.67235"
         },
         {
            "FecId": "5",
            "FecCode": "BEF",
            "FecName": "Belçika Frangı",
            "CurrencyAsk": "0.08169",
            "CurrencyBid": "0.08109"
         },
         {
            "FecId": "6",
            "FecCode": "DKK",
            "FecName": "Danimarka Kronu",
            "CurrencyAsk": "0.44349",
            "CurrencyBid": "0.43863"
         },
         {
            "FecId": "7",
            "FecCode": "FRF",
            "FecName": "Fransız Frangı",
            "CurrencyAsk": "0.50239",
            "CurrencyBid": "0.49863"
         },
         {
            "FecId": "8",
            "FecCode": "NLG",
            "FecName": "Hollanda Florini",
            "CurrencyAsk": "1.49541",
            "CurrencyBid": "1.48424"
         },
         {
            "FecId": "9",
            "FecCode": "SEK",
            "FecName": "İsveç Kronu",
            "CurrencyAsk": "0.34833",
            "CurrencyBid": "0.34392"
         },
         {
            "FecId": "10",
            "FecCode": "CHF",
            "FecName": "İsviçre Frangı",
            "CurrencyAsk": "3.03091",
            "CurrencyBid": "3.00074"
         },
         {
            "FecId": "11",
            "FecCode": "ITL",
            "FecName": "İtalyan Lireti 100",
            "CurrencyAsk": "0.17019",
            "CurrencyBid": "0.16893"
         },
         {
            "FecId": "12",
            "FecCode": "CAD",
            "FecName": "Kanada Doları",
            "CurrencyAsk": "2.29336",
            "CurrencyBid": "2.26759"
         },
         {
            "FecId": "13",
            "FecCode": "KWD",
            "FecName": "Kuveyt Dinarı",
            "CurrencyAsk": "9.86751",
            "CurrencyBid": "9.76446"
         },
         {
            "FecId": "14",
            "FecCode": "NOK",
            "FecName": "Norveç Kronu",
            "CurrencyAsk": "0.35228",
            "CurrencyBid": "0.34714"
         },
         {
            "FecId": "15",
            "FecCode": "GBP",
            "FecName": "İngiliz Sterlini",
            "CurrencyAsk": "3.95234",
            "CurrencyBid": "3.91145"
         },
         {
            "FecId": "16",
            "FecCode": "SAR",
            "FecName": "Suudi Arabistan Riyali",
            "CurrencyAsk": "0.79864",
            "CurrencyBid": "0.78274"
         },
         {
            "FecId": "17",
            "FecCode": "JPY",
            "FecName": "Japon Yeni",
            "CurrencyAsk": "0.02819",
            "CurrencyBid": "0.02786"
         },
         {
            "FecId": "18",
            "FecCode": "FIM",
            "FecName": "Fin Markkası",
            "CurrencyAsk": "0.55426",
            "CurrencyBid": "0.55011"
         },
         {
            "FecId": "19",
            "FecCode": "EUR",
            "FecName": "Euro",
            "CurrencyAsk": "3.29546",
            "CurrencyBid": "3.27083"
         },
         {
            "FecId": "20",
            "FecCode": "ESP",
            "FecName": "İspanyol Pesetası",
            "CurrencyAsk": "0.01980",
            "CurrencyBid": "0.01966"
         },
         {
            "FecId": "21",
            "FecCode": "IEP",
            "FecName": "İrlanda Lirası",
            "CurrencyAsk": "4.18436",
            "CurrencyBid": "4.15310"
         },
         {
            "FecId": "22",
            "FecCode": "LUF",
            "FecName": "Lüksemburg Frangı",
            "CurrencyAsk": "0.08169",
            "CurrencyBid": "0.08109"
         },
         {
            "FecId": "23",
            "FecCode": "PTE",
            "FecName": "Portekiz Esküdosu",
            "CurrencyAsk": "0.01644",
            "CurrencyBid": "0.01632"
         },
         {
            "FecId": "24",
            "FecCode": "ALT (gr)",
            "FecName": "Altın",
            "CurrencyAsk": "126.79264",
            "CurrencyBid": "125.68777"
         },
         {
            "FecId": "25",
            "FecCode": "BHD",
            "FecName": "Bahreyn Dinarı",
            "CurrencyAsk": "7.89979",
            "CurrencyBid": "7.77417"
         },
         {
            "FecId": "26",
            "FecCode": "GMS (gr)",
            "FecName": "Gümüş",
            "CurrencyAsk": "1.91724",
            "CurrencyBid": "1.89418"
         },
         {
            "FecId": "27",
            "FecCode": "PLT (gr)",
            "FecName": "Platin",
            "CurrencyAsk": "106.13204",
            "CurrencyBid": "102.37902"
         },
         {
            "FecId": "29",
            "FecCode": "AED",
            "FecName": "Birleşik Arap Emirlikleri Dirhemi",
            "CurrencyAsk": "0.81173",
            "CurrencyBid": "0.80365"
         },
         {
            "FecId": "30",
            "FecCode": "RUB",
            "FecName": "Rus Rublesi",
            "CurrencyAsk": "0.04735",
            "CurrencyBid": "0.04608"
         },
         {
            "FecId": "36",
            "FecCode": "CNY",
            "FecName": "Çin Yuanı",
            "CurrencyAsk": "0.45541",
            "CurrencyBid": "0.42975"
         },
         {
            "FecId": "37",
            "FecCode": "QAR",
            "FecName": "Katar Riyali",
            "CurrencyAsk": "0.81876",
            "CurrencyBid": "0.80574"
         },
         {
            "FecId": "38",
            "FecCode": "PLD (gr)",
            "FecName": "Paladyum",
            "CurrencyAsk": "61.84797",
            "CurrencyBid": "60.94220"
         },
         {
            "FecId": "39",
            "FecCode": "CAG (gr)",
            "FecName": "Cumhuriyet Altını Grubu (22 ayar)",
            "CurrencyAsk": "117.85814",
            "CurrencyBid": "114.83323"
         },
         {
            "FecId": "40",
            "FecCode": "ZCeyrek",
            "FecName": "Çeyrek Altın (22 ayar)",
            "CurrencyAsk": "117.37977",
            "CurrencyBid": "115.31467"
         },
         {
            "FecId": "50",
            "FecCode": "MYR",
            "FecName": "Malezya Ringiti",
            "CurrencyAsk": "0.74977",
            "CurrencyBid": "0.73785"
         }
      ];
