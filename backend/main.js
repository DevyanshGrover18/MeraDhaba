const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express()
const port = 5000
const mongoDB= require("./db")

mongoDB();
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', require('./routes/newuser'))
app.use('/user', require('./routes/displayData'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})