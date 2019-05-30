const model = require('model');
const client = require('client');

const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

// Initialize API client
let api = new client.NPSAPIClient(API_KEY, API_ENDPOINT);

onmessage = function (msg) {
    console.log("Message received");
    console.log(msg);
};