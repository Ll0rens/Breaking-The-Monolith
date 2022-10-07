const express = require('express')
const db = require('./db.json');
const AWSXRay = require('aws-xray-sdk');
const app = express();
const XrayURL = process.env.XRAY_URL;

AWSXRay.setDaemonAddress(XrayURL);
app.use(AWSXRay.express.openSegment('Threads'));
console.log("the URL of the Xray is " + XrayURL);

//Endpoints
app.get('/api/threads', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    res.send(db.threads);
});

app.get('/api/threads/:threadId', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    const id = parseInt(req.params.threadId);
    res.send(db.threads.find((thread) => thread.id == id));
});

app.get('/api', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  res.send("API ready to receive requests")
})

app.get('/', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  res.send("Ready to receive requests")
})

app.use(AWSXRay.express.closeSegment());
app.listen(3000, () => {
  console.log('Worker started');
})
