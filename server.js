const express = require('express');
const app = express();
const axios = require('axios');
const https = require('https');
const port = process.env.PORT || 5000;

app.use(
    express.urlencoded({
      extended: true
    })
  )

  app.use(express.json())

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.post('/my-oauth', function (req, res) {
    const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token'
    const CLIENT_ID = req.body.client_id
    const CLIENT_SECRET = req.body.client_secret
    const CODE = req.body.code
  
    axios({
      method: 'post',
      url: GITHUB_AUTH_ACCESSTOKEN_URL,
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: CODE
      }
    })
    .then(function (response) {
        const qs = require('querystring');
        const finalresp = (qs.parse(response.data, '&', '='));
        res.json(finalresp);
    })
    .catch(function (error) {
      console.error('Error ' + error.message)
    })
  });