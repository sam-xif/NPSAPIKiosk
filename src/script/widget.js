const model = require('model');
const view = require('view');
const $ = require('jquery');


/**
 * Base Widget abstract class
 */
class Widget {
    /**
     * @param {String} containerID ID of the desired container of the widget
     * @param {NPSAPIWorkerManager} workerMgr
     * @param context
     */
    constructor(containerID, workerMgr, context) {
        this.containerID = containerID;
        this.workerMgr = workerMgr;
        this.context = context;
    }

    bind(data, dataTemplate) {
        throw new Error("Implementations of Widget must implement `bind()`");
    }

    update() {

    }

    render() {
        throw new Error("Implementations of Widget must implement `render()`");
    }
}

class SearchWidget extends Widget {
    constructor(workerMgr) {
        super("searchContainer", workerMgr, {});
    }

    render() {

    }
}

module.exports = {

};