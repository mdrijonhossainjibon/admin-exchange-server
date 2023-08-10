const express = require('express');
const router = express.Router();
const NOSQL = require('../mongodb');

router.get('/', async (req, rep) => {

    try { 
        const users = await NOSQL.USER.find();
        const Data = []; // Initialize an empty array to store the data

        for (const user of users) {
            const kyc = await NOSQL.KYC.findOne({ firstName: user.uid });
            const kycData = {
                uid: user.uid,
                auth : user.twoFactorAuth,
                role: user.role,
                level: user.level,
                email: user.email,
                name: 'null', // Set the default value for Name
                referral_uid: user.referral,
                referralBy : user.referralBy,
                country: 'null', // Set the default value for Country
                Status: user.status,
                group :  user.group,
                created_at: user.timetamp
            };

            // Merge the KYC data if it exists
            if (kyc) {
                kycData.name = 'kyc.firstName' || kycData.name;
                kycData.country = kyc.nationality || kycData.country;
            }

            Data.push(kycData);
        }

        // Check if Data array is not empty
        if (Data.length > 0) {
            rep.json({
                "api-version": "1.0",
                "StatusCode": 200,
                "message": {success :' Data Found => ' + Data.length } ,
                 Data
            });
        } else {
            rep.json({
                "api-version": "1.0",
                "StatusCode": 200,
                "message": { error: 'No Data Found User' }
            });
        }
    } catch (error) {
        console.log(error)
        rep.status(500).json({
            "api-version": "1.0",
            "message": { error: 'Internal server error' }
        });
    }
});

router.get('/userblance',async (req,rep)=>{
    const UserWallet = await NOSQL.Userwallet.find();
    const result = []
    UserWallet.map((el)=>{
        result.push({
            uid :el.uid,
            symbol : el.currency,
            type : el.type,
            timestamp : el.timestamp,
            balance : el.balance,
            locked : el.lockedBalance
        })
    })
    return rep.json({
        "api-version": "1.0",
        "StatusCode": 200,
         result,
        "message": { error: 'No Data Found User' }
    })

})


module.exports = router;
