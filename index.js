const express = require('express')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser')
// Env Variables
const PORT = process.env.PORT;
const MY_GMAIL = process.env.MY_GMAIL;
const MY_GMAIL_PASSWORD = process.env.MY_GMAIL_PASSWORD;

const app = express() 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port =  PORT || 5000;
app.use(cors());

app.post('/sendMessage', (req, res) => {

  try{

  
  console.log("request",req.body);
  const { name, email, message } = req.body; //undefined

  // console.log(name , email, message);

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: MY_GMAIL,
          pass: MY_GMAIL_PASSWORD
        }
    }));

    const mailOptions = {
        from: email,
        to: MY_GMAIL,
        subject: `A Message from ${email} (My Portfolio)`,
        text: `
        Email: ${email}

        Name: ${name}

        Message: ${message}
        `
    };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    res.status(200).send('Send email successfully');
  }catch{
    (err)=> res.status(500).send(err.message);
  }
}
);

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})