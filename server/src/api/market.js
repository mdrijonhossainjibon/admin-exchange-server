const express = require('express');
const router = express.Router();
const NOSQL = require('../mongodb');


router.get('/', async (req,rep)=>{
    const Markets = await NOSQL.Market.find();
    const data  = []; 
    Markets.map((item)=> data.push({
        id : item.id,
        name : item.name,
        base_unit : item.base_currency,
        quote_unit : item.quote_currency,
        min_price : item.max_price,
        max_price: item.min_price,
        min_amount: item.min_amount,
        amount_precision : item.amount_precision,
        price_precision : item.price_precision, 
        state : item.status,
        created_at : item.created_at,
        filters : [{  "type": "significant_digits","digits": 3 }]
      }))


      return rep.status(200).json({
        "api-version": "1.0",
        "message": {
          "success": "Get Markets data successful.",
          "tips": {
            "retry": "You can try the request again later.",
            "contact_support": "If you encounter issues, please contact our support team for help."
          }
          
        },
        result: {  data  }
      });
});


router.post('/create', async (req,rep)=>{
  const Market = await NOSQL.Market.findOne({ id : '' })
});

module.exports = router;
