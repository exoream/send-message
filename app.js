require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi Twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: process.env.PHONE_NUMBER,
      to: to
    })
    .then(message => {
      console.log(`Pesan terkirim: ${message.sid}`);
      res.status(200).send('Pesan terkirim!');
    })
    .catch(error => {
      console.error('Gagal mengirim pesan:', error);
      res.status(500).send('Gagal mengirim pesan.');
    });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
