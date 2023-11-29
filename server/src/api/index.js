const express = require('express');
const router = express.Router();


router.get('/',(req,rep)=>{
rep.json({
    "api-version": "1.0",
    "StatusCode": 200,
    "msg": "Welcome To Api server"
    })
})

router.use('/account',require('./account'));
router.use('/userget',require('./user'));
router.use('/userupdate',require('./userupdate'));
router.use('/blockchain',require('./blockchain'));
router.use('/currencies',require('./Currencies'));
router.use('/deposit',require('./deposit'));
router.use('/market',require('./market'));   

module.exports = router;
