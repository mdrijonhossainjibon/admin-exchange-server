const mongoose = require('mongoose')
const Type =   require('./mongoose');

mongoose.connect(process.env.HOST, { useNewUrlParser: true, useUnifiedTopology: true }) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const KYC = mongoose.model('KYC', Type.KYCSchema);
const USER = mongoose.model('USER', Type.UserSchema);
const Google2FA = mongoose.model('Google2FA', Type.google2faSchema);
const Market = mongoose.model('Market',  Type.marketSchema);
const FeeGroup = mongoose.model('FeeGroup', Type.freeGroupSchema);
const Blockchain = mongoose.model('Blockchain',Type.BlockchainSchema)
const Currencies = mongoose.model('Currencies',Type.Currencieschema);
const Deposit = mongoose.model('Deposit',Type.DepositSchema)

const Userwallet = mongoose.model('Userwallet', Type.userWalletSchema);
const NOSQL = { KYC ,USER,Google2FA ,Userwallet,FeeGroup,Blockchain,Currencies,Deposit}


module.exports = NOSQL


 

