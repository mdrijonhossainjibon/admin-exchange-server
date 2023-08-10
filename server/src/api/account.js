const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const NOSQL = require('../mongodb')
const speakeasy = require('speakeasy');

router.post('/', async (req, rep) => {
    try {
        const { email, password, otp_code } = req.body;

        // Check if the user exists in the database

        const user = await NOSQL.USER.findOne({ email });
        if (!user) {
            return rep.json({ "api-version": "1.0",statusCode: 403 ,message: {  error: 'User not found' }  });
        }


        // Check if the password is correct
        if (user.password !== password) {
           
            return rep.json({ "api-version": "1.0",statusCode: 401 ,message: {  error: 'Invalid password' }  });
        }

        if (user) {
            const secret = await NOSQL.Google2FA.findOne({ uid: user.uid })
            if (!secret) {
                return rep.json({ "api-version": "1.0", statusCode: 401 , message: {error : 'Mustbe enable 2fa code '} })
            }
            const totp = speakeasy.totp({
                secret: secret.secret,
                encoding: 'base32',
            });

            if (otp_code !== totp) {
                return rep.json({ "api-version": "1.0", statusCode: 405, message: { error : 'invalid TOTP Code '} })
            }

 
            const Users = await NOSQL.USER.findOne({uid : user.uid})
            if (Users.role === 'admin' || Users.role === 'superadmin' || Users.role === 'accountant' || Users.role === 'technical' || Users.role === 'support') {
            
              if (Users.status === 'active') {
                if (Users.KycVerified === 'verified') {
                  // Perform actions for an active, verified account with appropriate permissions
                } else {
                  //console.log('You do not have permission to access this account. KYC verification is required.');
                  return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account. KYC verification is required.' } });
                }
              } else {
                //console.log('You do not have permission to access this account. Your account status is ' + Users.status);
                return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account. Your account status is ' + Users.status } });
              }
            } else {
              //console.log('You do not have permission to access this account');
              return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account' } });
            }




            
            const token = jwt.sign({ uid: user.uid }, 'secret-key', { expiresIn: '11h' });

            rep.json({ "api-version": "1.0",statusCode: 200, message: { sus : 'code' }, data : token });
        }
    } catch (error) {
        rep.status(500).json({ "api-version": "1.0", message: { error : 'Internal server error' } })
    }
})
 


router.post('/verify',(req,rep)=>{

    const authHeader = req.headers['authorization'];
    const token = authHeader;
    
    jwt.verify(token, 'secret-key',  async (err, user) => {
        if (err) {
            return rep.json({ "api-version": "1.0", statusCode: 403, message:{  error :  'expires' }})
          }

         
          const Users = await NOSQL.USER.findOne({uid : user.uid})
          if (Users.role === 'admin' || Users.role === 'superadmin' || Users.role === 'accountant' || Users.role === 'technical' || Users.role === 'support') {
          
            if (Users.status === 'active') {
              if (Users.KycVerified === 'verified') {
                // Perform actions for an active, verified account with appropriate permissions
              } else {
                //console.log('You do not have permission to access this account. KYC verification is required.');
                return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account. KYC verification is required.' } });
              }
            } else {
              //console.log('You do not have permission to access this account. Your account status is ' + Users.status);
              return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account. Your account status is ' + Users.status } });
            }
          } else {
            //console.log('You do not have permission to access this account');
            return rep.json({ "api-version": "1.0", statusCode: 403, message: { error: 'You do not have permission to access this account' } });
          }
          

          return rep.json({ "api-version": "1.0", statusCode: 200, data : {
            uid: user.uid,
            fastname: '',
            middlename: '',
            lastname: '',
            email:  Users.email,
            Country: '',
            group : Users.group,
            Referral_UID:  Users.referral,
            Level:  Users.level,
            Role:  Users.role,
            Status: Users.status,
            timetamp:  Users.timetamp
          }})
    })

})
module.exports = router;
