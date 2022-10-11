const express = require('express')
const db = require('./db.json');
const AWSXRay = require('aws-xray-sdk');
const app = express();
const XrayURL = process.env.XRAY_URL;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

AWSXRay.setDaemonAddress(XrayURL);
app.use(AWSXRay.express.openSegment('Monolith'));
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

app.get('/api/users/latency', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  sleep(10000).then(() => {
  // This will execute 10 seconds from now
  res.status(200).send('Request received');
  });
});

app.get('/api/users/:userId', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    const id = parseInt(req.params.userId);
    res.send(db.users.find((user) => user.id == id));
});

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

app.get('/api/posts', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    res.send(db.posts);
});

app.get('/api/posts/in-thread/:threadId', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    const id = parseInt(req.params.threadId);
    res.send(db.posts.filter((post) => post.thread == id));
});

app.get('/api/posts/by-user/:userId', (req, res) => {
    var segment = AWSXRay.getSegment();
    console.log("The segment is " + segment);
    const id = parseInt(req.params.userId);
    res.send(db.posts.filter((post) => post.user == id));
});

app.get('/api', (req, res) => {
  var segment = AWSXRay.getSegment();
  console.log("The segment is " + segment);
  res.send("API ready to receive requests")
})

app.get('/', (req, res) => {
  res.send("Ready to receive requests")
})

app.use(AWSXRay.express.closeSegment());
app.listen(3000, () => {
  console.log('Worker started');
})
