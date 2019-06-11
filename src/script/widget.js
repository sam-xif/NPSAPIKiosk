const model = require('model');
const view = require('view');
const $ = require('jquery');

/**
 * A data source object which can be dynamically written to and read from.
 */
class DataSource {
    constructor() {
        this.data = [];
        this.counter = 0;
    }

    wrap(item) {
        let wrapped = {
            id: this.counter,
            data: item
        };

        this.counter += 1;
        return wrapped;
    }

    unwrap(item) {
        let unwrapped = item.data;
        return unwrapped;
    }

    add(item) {
        this.data.push(this.wrap(item));
    }

    addAll(itemsArr) {
        this.data = this.data.concat(itemsArr.map(this.wrap));
    }

    set(itemsArr) {
        this.data = itemsArr.map(this.wrap);
    }

    remove(item) {

    }

    removeAt(index) {

    }

    getSnapshot() {
        return this.data.map(this.unwrap);
    }

    getAt(index) {
        return this.data[index]; // Returns undefined if index out of bounds
    }

    getWithId(id) {

    }
}

/**
 * Base Widget abstract class
 */
class Widget {
    /**
     * @param {String} containerId ID of the desired container of the widget
     * @param {NPSAPIWorkerManager} workerMgr
     * @param context
     */
    constructor(containerId, workerMgr, context) {
        this.containerID = containerId;
        this.workerMgr = workerMgr;
        this.context = context;
    }

    /**
     *
     * @param {DataSource} dataSource The data source object to read from
     * @param {Template} dataTemplate
     */
    bind(dataSource, dataTemplate) {
        this.dataSource = dataSource;
        this.dataTemplate = dataTemplate;

        // Render initial view
        this.render();
    }

    /**
     * <p>
     *     Updates the view with any new data from the data source. This method can be added to event listeners
     *     so that updates can be triggered by DOM events.
     * </p>
     */
    update() {
        if (!this.dataSource || !this.dataTemplate) {
            throw new Error("Data must be bound before updating");
        }

        this.render();
    }

    render() {
        if (!this.dataSource || !this.dataTemplate) {
            throw new Error("Data must be bound before rendering");
        }

        let data = this.dataSource.getSnapshot();

        view.ViewUtil.clearTag(this.containerID);
        data.forEach(item => {
            this.dataTemplate.render(this.containerID, { data: item });
        });
    }
}

module.exports = {
    Widget : Widget,
    DataSource : DataSource
};