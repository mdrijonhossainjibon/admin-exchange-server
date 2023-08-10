const express = require('express');
const NOSQL = require('../mongodb');
const router = express.Router();


router.get('/',(req,rep)=>{
    rep.json({
        "api-version": "1.0",
        "StatusCode": 200,
        "message": { success : " Welcome To Api server" }
        })
    })


    router.post('/handelcase', async (req, rep) => {

        const { promise, uid, selectedValue } = req.body.payload;
      
        try {
          let updatedData;
          let result;
      
          switch (promise) {
            case 'status':
              updatedData = await NOSQL.USER.findOneAndUpdate({ uid }, { status: selectedValue });
              result = { uid: updatedData.uid, Status: updatedData.status };
              break;
            case 'role':
              updatedData = await NOSQL.USER.findOneAndUpdate({ uid }, { role: selectedValue });
              result = { uid: updatedData.uid, role: updatedData.role };
              break;
            case 'auth':
              const user = await NOSQL.USER.findOne({ uid });
              const currentTwoFactorAuth = user.twoFactorAuth;
              const updatedTwoFactorAuth = !currentTwoFactorAuth;
      
              updatedData = await NOSQL.USER.findOneAndUpdate({ uid }, { twoFactorAuth: updatedTwoFactorAuth });
              result = { uid: updatedData.uid, auth: updatedData.twoFactorAuth };
              break;
              case 'Fee-group' :
              updatedData = await NOSQL.USER.findOneAndUpdate({ uid }, { group : selectedValue });
              result = { uid: updatedData.uid, group: updatedData.group };
              break;
            default:
              return rep.json({ "api-version": "1.0", "StatusCode": 403, "message": { error: "Not Match Found Argument ### type invalid or error" }});
          }
      
          return rep.json({ "api-version": "1.0", "StatusCode": 200, result, "message": { success: "Update Success" }});
        } catch (error) {
          console.log(error);
          return rep.status(500).json({ "api-version": "1.0", "StatusCode": 500, "message": { error: "Internal Server Error" }});
        }
      });
      
      

module.exports = router;