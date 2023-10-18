
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
const server = app.listen(process.env.PORT || 4009, () => {
    const address = server.address();
    if (address) {
        console.log(`Server started on http://${address.address}:${address.port}`);
    } else {
        console.log('Server started, but address information is not available.');
    }
});
