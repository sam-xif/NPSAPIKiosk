const model = require('model');
const client = require('client');

const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

// Initialize API client
let api = new client.NPSAPIProxy(API_KEY, API_ENDPOINT);

console.log("Worker has been started!");

/**
 *
 * @param msg
 */
onmessage = function (msg) {
    let request = msg.data;
    if (request.action === "get") {
        let resource = request.data.resource;
        let params = request.data.params;
        let response = api.get(resource, params)
            .then((response) => {
                postMessage({
                    status: 'ok',
                    id: request.id,
                    reqResource: resource,
                    reqParams: params,
                    data: response
                });
            })
            .catch((error) => {
                postMessage({
                    status: 'error',
                    id: request.id,
                    reqResource: resource,
                    reqParams: params,
                    data: error
                })
            });
    }
};
