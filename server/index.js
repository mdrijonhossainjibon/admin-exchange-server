
try {
require('dotenv').config();
require('./src')
require('./src/ws');


 
} catch (error) {
  console.log(error)
}