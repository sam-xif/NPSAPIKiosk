const model = require('model');
const client = require('client');

console.log("Hello from worker");

onmessage = function (msg) {
    console.log("Message received");
    console.log(msg);
};