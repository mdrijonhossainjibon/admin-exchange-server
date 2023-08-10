const express = require('express');
const NOSQL = require('../mongodb');
const router = express.Router();

router.get('/',async (req,rep)=>{
    const deposit = await NOSQL.Deposit.find()
   
 rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'response Get Success' }, result: deposit });
    
})

module.exports = router;