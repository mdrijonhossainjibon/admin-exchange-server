const express = require('express');
const NOSQL = require('../mongodb');
const router = express.Router();

router.post('/', async (req, rep) => {
  const { key, name, client, height, explorer_address, explorer_transaction, min_confirmations, server, created_at, enabled, Websoket,chainid } = req.body.data;

  try {
    const existingBlockchain = await NOSQL.Blockchain.findOne({ key });
    if (existingBlockchain) {
      
    return  rep.json({ "api-version": "1.0", StatusCode: 400, message: { error: 'Blockchain with the same key already exists' } });
      
    }

   await NOSQL.Blockchain.create({ key, name, client, height, explorer_address, explorer_transaction, min_confirmations,server,Websoket,chainid,timestamp: created_at,enabled});
  
    rep.json({ "api-version": "1.0", StatusCode: 200, message: { success: 'Create Blockchain success' } });

  } catch (error) {
    rep.status(500).json({ "api-version": "1.0", StatusCode: 500, message: { error: 'Internal server error' } });
  }
});


router.get('/getall', async(req,rep)=>{
    
  const data =   await NOSQL.Blockchain.find()
  const respons = []
  
  if(data.length > 0){
    data.map((item,id)=>{
        const { key,  name, client, height,  explorer_address, explorer_transaction,  min_confirmations, server , timestamp, enabled ,Websoket,chainid} = item;
        respons.push({id , key,  name, client, height,  explorer_address, explorer_transaction,  min_confirmations, server ,Websoket,chainid, created_at : timestamp, enabled})
      })
  }else{
    return rep.json({ "api-version": "1.0", "StatusCode": 202, "message": { error: "No Data Available" },result : []});
  }
  
  rep.json({"api-version": "1.0","StatusCode": 200, message : { success : 'response Get Success'},result : respons })
  

})
 

router.post('/updated', async (req, res) => {
  try {
    const update = await NOSQL.Blockchain.findOne({ key: req?.body?.key });

    if (!update) {
      return res.json({ "api-version": "1.0", "StatusCode": 404, message: { error: 'Update not found' } });
    }

    switch (req?.body?.updated) {
      case 'reload':
        update.enabled = req.body.enabled;
        await update.save();
        res.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success' }, result: { key: update.key, enabled: update.enabled } });
        break;
        case 'height': // Add a case for 'height' update
        update.height = req.body.height;
        await update.save();
        res.status(200).json({
          "api-version": "1.0",
          "StatusCode": 200,
          message: { success: 'Update Success' },
          result: { key: update.key, height: update.height }
        });
        break;
      default:
        Object.assign(update, req?.body);
        await update.save();
        res.status(200).json({
          "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success' }, result: {
            key: update.key,
            name: update.name,
            client: update.client,
            height: update.height,
            explorer_address: update.explorer_address,
            explorer_transaction: update.explorer_transaction,
            min_confirmations: update.min_confirmations,
            server: update.server,
            Websoket : update.Websoket,
            chainid : update.chainid,
            enabled: update.enabled
          }
        });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ "api-version": "1.0", "StatusCode": 500, message: { error: 'Internal Server Error' } });
  }
});



module.exports = router;