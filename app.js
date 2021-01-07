const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

app.get('/api', (req, res, next)=>{
  res.send('API status: Running');
});

app.post('/api/email', (req, res, next)=> {
  sendGrid.setApiKey(process.env.send);
  const msg = {
    to:'jimmy888swe@gmail.com',
    from: req.body.email,
    subject: 'Mail från RealGobi.se',
    text: req.body.message
  }

  sendGrid.send(msg)
  .then(result=>{
    res.status(200).json({
      success:true
    });
  })
  .catch((err)=> {
    console.log('error', err);
    res.status(401).json({
      success:false
    });
  })
});



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));