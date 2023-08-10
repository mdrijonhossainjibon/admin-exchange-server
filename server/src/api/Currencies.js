const express = require('express');
const NOSQL = require('../mongodb');
const router = express.Router();

router.post('/', async (req, rep) => {
    try {
      console.log(req.body);
      const { value ,options} = req.body;
      const Currenciedata = {
        visible: value?.visible,
        name: value?.name,
        type: value?.type,
        code: value?.code,
        symbol: value?.code,
        blockchain_key: [{key : value?.blockchain_key}],
        position: value?.position,
        precision: value?.precision,
        subunits: value?.subunits,
        icon_url: value?.icon_url,
        details: 'YSEC is a fully transparent and automated launchpad where developers can customize their preslale to their needs and lock their allocations the way they wish. The platform uses a 5% base fee of which half goes to our yield pool where YSEC token holders can recoup part of the presale proceeds.',
        deposit_enabled: value?.deposit_enabled,
        deposit_fee: value?.deposit_fee,
        min_deposit_amount: value?.min_deposit_amount,
        min_collection_amount: value?.min_collection_amount,
        withdrawal_enabled: value?.withdrawal_enabled,
        withdraw_fee: value?.withdraw_fee,
        min_withdraw_amount: value?.min_collection_amount,
        withdraw_limit_24h: value?.withdraw_limit_24h,
        withdraw_limit_72h:value?.withdraw_limit_72h,
       
         options
      } 
      console.log(Currenciedata)
      const Currencies = await NOSQL.Currencies.findOne({ code: value?.code });
      if (Currencies) {
        return rep.json({ "api-version": "1.0", "StatusCode": 400, message: { error: 'Currencies with the same key already exists' } });
      }
  
      const newCurrencies = new NOSQL.Currencies(Currenciedata);
      await newCurrencies.save();
  
      return rep.json({ "api-version": "1.0", StatusCode: 200, message: { success: 'Create Currencies success' } });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return rep.json({ "api-version": "1.0", "StatusCode": 400, message: { error: errorMessages[0] } });
      }
      return rep.status(500).json({ "api-version": "1.0", "StatusCode": 500, message: { error: 'Internal Server Error' } });
    }
  });
  
router.get('/getall', async(req,rep)=>{


try {
    const Currencies = await NOSQL.Currencies.find();
    if (Currencies.length > 0) {
        return rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'response Get Success' }, result: Currencies });
    }
    return rep.json({ "api-version": "1.0", "StatusCode": 202, "message": { error: "No Data Available" },result : []});

} catch (error) {
  return  res.status(500).json({ "api-version": "1.0", "StatusCode": 500, message: { error: 'Internal Server Error' } });
}

     
})



router.post('/:code', async (req, rep) => {
    try {

      const code = req.params.code;
      const Currencies = await NOSQL.Currencies.findOne({ code });
  
      if (!Currencies) {
        return rep.json({ "api-version": "1.0", "StatusCode": 404, message: { error: 'Currency not found' } });
      }
  
      switch (req.body?.updated) {
        case 'deposit_enabled':
            const deposit =  Currencies.deposit_enabled === 'active' ? 'suspend' : 'active'
            Currencies.deposit_enabled =  deposit;
            await Currencies.save();
            rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success Deposit => ' + Currencies.deposit_enabled }, result: { code: Currencies.code, deposit_enabled : Currencies.deposit_enabled } });
          break;
        case 'withdrawal_enabled' :
            const withdrawal =  Currencies.withdrawal_enabled === 'active' ? 'suspend' : 'active'
            Currencies.withdrawal_enabled =  withdrawal;
            await Currencies.save();
            rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success Withdrawal => ' + Currencies.withdrawal_enabled }, result: { code: Currencies.code, withdrawal_enabled : Currencies.withdrawal_enabled } });
          break;
          case 'visible':
            const Status =  Currencies.visible === 'active' ? 'suspend' : 'active'
            Currencies.visible=  Status;
            await Currencies.save();
            rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success Status => ' + Currencies.visible }, result: { code: Currencies.code, visible : Currencies.visible } });
          break; 
        default:
      
   const { value  } = req.body;

          const Currenciedata = {
            visible: value?.visible,
            name: value?.name,
            type: value?.type,
            code: value?.code,
            symbol: value?.code,
            position: value?.position,
            precision: value?.precision,
            subunits: value?.subunits,
            icon_url: value?.icon_url,
            //details: 'YSEC is a fully transparent and automated launchpad where developers can customize their preslale to their needs and lock their allocations the way they wish. The platform uses a 5% base fee of which half goes to our yield pool where YSEC token holders can recoup part of the presale proceeds.',
            deposit_enabled: value?.deposit_enabled,
            deposit_fee: value.deposit_fee,
            min_deposit_amount: value?.min_deposit_amount,
            min_collection_amount: value?.min_collection_amount,
            withdrawal_enabled: value?.withdrawal_enabled,
            withdraw_fee: value?.withdraw_fee,
            min_withdraw_amount: value?.min_collection_amount,
            withdraw_limit_24h: value?.withdraw_limit_24h,
            withdraw_limit_72h:value?.withdraw_limit_72h
          }
            
          await Currencies.updateOne(Currenciedata)
          const blockchain = [{key : req.body.value?.blockchain_key}]
         console.log(blockchain)
          if(Array.isArray(blockchain)){
            blockchain.forEach((option) => {
              const existingblockchain = Currencies.blockchain_key.find((existingOption) => existingOption.key === option.key);
              if (existingblockchain) {
                existingblockchain.key = option?.key; // Update existing option value
               
              } else {
                Currencies.blockchain_key.push(option); // Add new option
              }
            });
          }else if(Array.isArray(blockchain[0])){
            blockchain.forEach((option) => {
              const existingblockchain = Currencies.blockchain_key.find((existingOption) => existingOption.key === option.key);
              if (existingblockchain) {
                existingblockchain.key = option?.key; // Update existing option value
               
              } else {
                Currencies.blockchain_key.push(option); // Add new option
              }
            });
          } else{
            return  rep.json({ "api-version": "1.0", "StatusCode": 202, "message": { error: "blockchain_key is not an array" } });
          }
        
          if (Array.isArray(req.body?.options)) {
            for (const option of req.body.options) {
              const existingOption = Currencies.options.find(existingOption => existingOption.key === option.key);
            
              if (existingOption) {
                existingOption.value = option.value; // Update existing option value
                await Currencies.save();
              } else {
                Currencies.options.push(option); // Add new option
                await Currencies.save();
              }
            }
            
            
            
          } else {
           
            return rep.json({ "api-version": "1.0", "StatusCode": 202, "message": { error: "options is not an array" } });
          }
          
          rep.status(200).json({ "api-version": "1.0", "StatusCode": 200, message: { success: 'Update Success '}, result:  Currencies });
      }
  
    } catch (error) {
      console.log(error.message);
      return rep.status(500).json({ "api-version": "1.0", "StatusCode": 500, message: { error: 'Internal Server Error' } });
    }
  });
  



module.exports = router;