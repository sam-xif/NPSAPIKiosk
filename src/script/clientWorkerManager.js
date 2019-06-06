const client = require('client');

class NPSAPIWorkerManager {
    /**
     * <p>
     *     Creates and manages an NPS API client worker thread. This class handles message passing and receiving
     *     and accepts {@link NPSAPIRequest}s.
     * </p>
     * @param {String} clientWorkerScriptSrc
     * @constructor
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

    request(request, callback) {
        this.worker.postMessage({
            action: "get",
            id: this.requestCounter,
            data: request.strip()
        });
        if (callback) {
            this.callbacks[this.requestCounter] = callback;
        }
        this.requestCounter++;
    }

    resolve(response) {
        let idx = parseInt(response.id);
        if (this.callbacks[idx]) {
            this.callbacks[parseInt(response.id)](response);
        } else {
            // error?
        }
    }
}

module.exports = {
    NPSAPIWorkerManager : NPSAPIWorkerManager
};
