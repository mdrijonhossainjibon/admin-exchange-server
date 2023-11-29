const mongoose = require('mongoose');

const KYCSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    enum: ['Passport', 'Driver\'s License', 'ID Card'],
    required: true
  },
  documentNumber: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



 const UserSchema = new  mongoose.Schema ({
  email: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: Number, required: true ,default : 0},
  role: {
    type: String,
    enum: ['admin', 'superadmin', 'accountant', 'technical', 'support', 'user'], default : 'user'
  },
  status: { type: String, enum: ['active', 'suspend', 'pending', 'inactive'],default : 'pending'},
  uid: { type: String, required: true },
  referal_uid: { type: String, default: null },
  two_factor_auth: { type: Boolean, default: false }, // Updated to lowercase
  kyc_status: { type: String, enum: ['pending', 'verified', 'rejected', 'hold', 'review' , 'notsubmit'] }, // Added kyc_status field
  language : { type : String, default : 'en'},
  created_at: {  type: Date , default : Date.now() },
  updated_at: { type: Date , default : Date.now() },
  
});

const google2faSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  secret: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


const marketSchema = new mongoose.Schema({
  id: {
      type: String,
      required: true,
  },
  name: {
      type: String,
      required: true,
  },
  base_currency: {
      type: String,
      required: true,
  },
  quote_currency: {
      type: String,
      required: true,
  },
  amount_precision: {
      type: Number,
      required: true,
  },
  price_precision: {
      type: Number,
      required: true,
  },
  max_price: {
      type: Number,
      required: true,
  },
  min_price: {
      type: Number,
      required: true,
  },
  min_amount: {
      type: Number,
      required: true,
  },
  enabled: {
      type: Boolean,
      default: true,
  },
  status: {
      type: Boolean,
      default: false,
  },
  created_at: {
      type: Date,
      default: Date.now,
  },
  updated_at: {
      type: Date,
      default: Date.now,
  },
});


const BlockchainSchema = new mongoose.Schema({
  key : { type : String, unique : true },
  name : String,
  client : String,
  height : Number,
  explorer_address : String,
  explorer_transaction : String,
  min_confirmations : String,
  server : String,
  Websoket : { type : String, require : true},
  chainid : { type : String, require : true},
  timestamp : { type : Date , default : Date.now},
  enabled : Boolean
})


const freeGroupSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  group: { type: String, required: true },
  market_id: { type: String, required: true },
  maker: { type: String, required: true },
  taker: { type: String, required: true }
});


const Currencieschema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String },
  symbol: { type: String},
  type: { type: String },
  blockchain_key: [{
    key : { type : String },
  }],
  position: { type: Number},
  precision: { type: Number },
  subunits: { type: Number },
  min_collection_amount: { type: Number},
  min_deposit_amount: { type: Number},
  min_withdraw_amount: { type: Number },
  withdraw_fee: { type: Number },
  withdraw_limit_24h: { type: Number },
  withdraw_limit_72h: { type: Number },
  visible: { type: String },
  deposit_enabled: { type: String},
  deposit_fee : Number,
  withdrawal_enabled: { type: String },
  details: { type: String },
  options: [
    {
      key: { type: String,  },
      value: { type: String },
    },
  ],
  icon_url: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const DepositSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  amount: String,
  currency_code : String,
  type :String,
  txid : String,
  fee : Number,
  Status : String,
  key : String,
  confirmations : Number,
  timestamp: { type: Date, default: Date.now },
});

const userWalletSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  type: {
    type: String,
    enum : ['spot', 'trading'], 
    default : 'spot'
  },
  currency: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default : 0
  },
  lockedBalance: {
    type: Number,
    default: 0
  },
  privateKey: {
    type: String,
    required: true,
    unique : true
  },
  address: {
    type: String,
    required: true,
    unique : true
  },
  Status : {
    type : Boolean,
    require : true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}) ;


const Type = { KYCSchema, UserSchema,userWalletSchema, google2faSchema, marketSchema, freeGroupSchema,BlockchainSchema ,Currencieschema,DepositSchema }


module.exports = Type;





