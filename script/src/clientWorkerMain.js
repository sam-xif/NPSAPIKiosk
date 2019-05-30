const model = require('model');
const client = require('client');

const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

// Initialize API client
let api = new client.NPSAPIProxy(API_KEY, API_ENDPOINT);

onmessage = function (msg) {
    let data = msg.data;
    if (data.action === "get") {
        console.log("Get request received.");
        console.log(msg);

        // Make sure to add api key to all requests received

        data.request.execute(api)
            .then((response) => {
                postMessage({
                    status: 'ok',
                    id: data.id,
                    response: response
                });
            })
            .catch((error) => {
                postMessage({
                    status: 'error',
                    id: data.id,
                    response: error
                })
            });
    }
};
