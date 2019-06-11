const client = require('client');

const API_KEY = "{{ api_key }}";
const API_ENDPOINT = "{{ api_endpoint }}";

// Initialize API client
let api = new client.NPSAPIProxy(API_KEY, API_ENDPOINT);

console.log("Worker has been started!");

/**
 * Processes messages received by this worker.
 * @param {Object} msg The message received
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
                console.log(error);
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
