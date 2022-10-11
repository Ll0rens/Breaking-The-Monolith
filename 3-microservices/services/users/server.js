const express = require('express')
const db = require('./db.json');
const AWSXRay = require('aws-xray-sdk');
const app = express();
const XrayURL = process.env.XRAY_URL;

AWSXRay.setDaemonAddress(XrayURL);
app.use(AWSXRay.express.openSegment('Users'));
console.log("the URL of the Xray is " + XrayURL);

//Endpoints
app.get('/api/users', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  res.send(db.users);
});

app.get('/api/users/error', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  res.status(500).send('Status: Internal Server Error')
});

app.get('/api/users/:userId', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    const id = parseInt(req.params.userId);
    res.send(db.users.find((user) => user.id == id));
});

app.get('/api', (req, res) => {
  res.send("API ready to receive requests")
})

app.get('/', (req, res) => {
  res.send("Ready to receive requests")
})

app.use(AWSXRay.express.closeSegment());
app.listen(3000, () => {
  console.log('Worker started');
})
