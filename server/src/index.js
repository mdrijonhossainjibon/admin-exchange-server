
const  express =  require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,rep)=>{
  rep.json({ "api-version": "1.0", StatusCode: 200, msg: "Welcome To Api server" })
})
app.use('/api/v1',require('./api'))
app.listen(process.env.PORT || 4009,()=>{
    console.log(`server start admin ${process.env.PORT || 4009}`)
})

