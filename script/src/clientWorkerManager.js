const client = require('client');

/**
 * <p>
 *     Creates and manages an NPS API client worker thread. This class handles message passing and receiving
 *     and accepts {@link NPSAPIRequest}s.
 * </p>
 * @param {String} clientWorkerScriptSrc
 * @constructor
 */
function NPSAPIWorkerManager(clientWorkerScriptSrc) {
    // Setup worker if possible
    if (!window.Worker) {
        throw new Error(
            "Cannot start background API service on worker thread. " +
            "Make sure worker threads are supported on your browser.");
    }

    this.requestCounter = 0;
    this.worker = new Worker(clientWorkerScriptSrc);
    this.callbacks = [];

    /**
     * <p>
     *     Sends a request message to the worker,
     *     which routes the request to the API and retrieves the result asynchronously.
     * </p>
     * @param {NPSAPIQuery} request
     * @param {function(Object): void ?} callback
     */
    this.request = function (request, callback) {
        this.worker.postMessage({
            action: "get",
            id: this.requestCounter,
            request: request
        });
        if (callback) {
            this.callbacks[this.requestCounter] = callback;
        }
        this.requestCounter++;
    };

    // register event handler for this instance's worker
    /*
     * Form of response:
     * {
     *  status: <String>
     *  id: <Int>
     *  responseData: <JSON>
     * }
     */
    this.worker.onmessage = function (msg) {
        let data = msg.data;
        this.callbacks[data.id](data);
    }
}
