const client = require('client');

/**
 * <p>
 *     Creates and manages an NPS API client worker thread. This class handles message passing and receiving
 *     and accepts {@link NPSAPIQuery}s.
 * </p>
 */
class NPSAPIWorkerManager {
    /**
     * @param {String} clientWorkerScriptSrc The worker script to use
     */
    constructor(clientWorkerScriptSrc) {
        // Setup worker if possible
        if (!window.Worker) {
            throw new Error(
                "Cannot start background API service on worker thread. " +
                "Make sure worker threads are supported on your browser.");
        }

        this.requestCounter = 0;
        this.worker = new Worker(clientWorkerScriptSrc);
        this.callbacks = [];

        // For internal use

        // register event handler for this instance's worker
        /*
         * Form of response:
         * {
         *  status: <String>
         *  id: <Int>
         *  responseData: <JSON>
         * }
         */
        this.worker.onmessage = (function (context) { // close over this instance
            return (function (msg) {
                let data = msg.data;
                context.resolve(data);
            });
        })(this);
    }

    /**
     * Queues a request.
     * @param {NPSAPIQuery} query The query object.
     * @param {function(NPSAPIResponse): void ?} callback An optional callback function
     */
    request(query, callback) {
        this.worker.postMessage({
            action: "get",
            id: this.requestCounter,
            data: query.strip()
        });
        if (callback) {
            this.callbacks[this.requestCounter] = callback;
        }
        this.requestCounter++;
    }

    /**
     * For internal use. Resolves the given response object.
     * @param response The response object
     */
    resolve(response) {
        let idx = parseInt(response.id);
        if (this.callbacks[idx]) {
            this.callbacks[parseInt(response.id)](client.NPSAPIResponse.from(response));
        } else {
            // error?
        }
    }
}

module.exports = {
    NPSAPIWorkerManager : NPSAPIWorkerManager
};
