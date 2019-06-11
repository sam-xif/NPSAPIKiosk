const view = require('view');

/**
 * A data source object which can be dynamically written to and read from.
 */
class DataSource {
    constructor() {
        this.data = [];
        this.counter = 0;
        this.onUpdateCallbacks = [];
    }

    /**
     *
     * @param {function(Array<{id:int, data: *}>): void} fn
     */
    addOnUpdateHandler(fn) {
        this.onUpdateCallbacks.push(fn);
    }

    fireOnUpdateEvent() {
        this.onUpdateCallbacks.forEach(fn => fn(this.getSnapshot()));
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
        this.fireOnUpdateEvent();
    }

    addAll(itemsArr) {
        this.data = this.data.concat(itemsArr.map(item => this.wrap(item)));
        this.fireOnUpdateEvent();
    }

    insert(index, item) {
        this.data.splice(index, 0, this.wrap(item));
        this.fireOnUpdateEvent();
    }

    remove(item) {

    }

    removeAt(index) {

    }

    update(index, newItem) {
        this.removeAt(index);
        this.insert(index, newItem);
        this.fireOnUpdateEvent();
    }

    set(itemsArr) {
        this.data = itemsArr.map(item => this.wrap(item));
        this.fireOnUpdateEvent();
    }

    getSnapshot() {
        return this.data.slice(0);
    }

    getSnapshotRaw() {
        return this.getSnapshot.map(item => this.unwrap(item));
    }

    /**
     * <p>Returns a list of operations that, when applied to the given previous snapshot, will result in this instance's
     * data.</p>
     * @param {Array} previousSnapshot
     * @return {Array}
     */
    getDelta(previousSnapshot) {
        let ops = [];

        // Two ids can never swap places, because of how the counter is incremented after every addition or
        // insertion, which greatly simplifies computing deltas.
        let thisSnapshot = this.getSnapshot();

        let previousIds = previousSnapshot.map(item => item.id);
        let thisIds = thisSnapshot.map(item => item.id);

        previousIds.forEach((id, index) => {
            if (!thisIds.includes(id)) {
                ops.push({op: "remove", id: id});
            }
        });

        thisIds.forEach((id, index) => {
            if (!previousIds.includes(id)) {
                ops.push({ op: "insertAt",
                    index: index,
                    data: this.unwrap(thisSnapshot[index])
                }); // -1 encodes insert at the beginning
            }
        });

        return ops;
    }
}

/**
 * Base Widget abstract class
 */
class Widget {
    /**
     * @param {String} containerId ID of the desired container of the widget
     */
    constructor(containerId) {
        this.containerID = containerId;
    }

    /**
     *
     * @param {DataSource} dataSource The data source object to read from
     * @param {Template} dataTemplate
     */
    bind(dataSource, dataTemplate) {
        this.dataSource = dataSource;
        this.dataTemplate = dataTemplate;

        // Save snapshot of data
        this.lastSnapshot = this.dataSource.getSnapshot();

        if (this.lastSnapshot.length > 0) {
            this.render();
        }
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

        let deltaOps = this.dataSource.getDelta(this.lastSnapshot);
        let idToIndexMap = this.lastSnapshot.reduce((acc, item, index) => {
            acc[item.id] = index;
            return acc;
        }, {});

        console.log(idToIndexMap);

        // Apply delta
        deltaOps.forEach(op => {
            switch (op.op) {
                case "remove":
                    view.ViewUtil.removeNthChild(this.containerID, idToIndexMap[op.id]);
                    break;
                case "insertAt":
                    if (op.index === 0) {
                        this.dataTemplate.renderPrepend(this.containerID, {data: op.data});
                    } else {
                        this.dataTemplate.renderInsertAfter(op.index - 1, this.containerID, {data: op.data});
                    }
                    break;
                default:
                    throw new Error("Unrecognized delta operation"); // should not be reached, here for insurance
            }
        });

        // Finally, update lastSnapshot with the new snapshot
        this.lastSnapshot = this.dataSource.getSnapshot();
    }

    /**
     * <p>Renders (or re-renders) data source in its current state. This is less efficient than update() because
     * it always clears out all of the rendered fragments and re-renders everything, so it is recommended to use
     * update() for repeated updates to the same dataset.</p>
     * @throws {Error} if
     */
    render() {
        if (!this.dataSource || !this.dataTemplate) {
            throw new Error("Data must be bound before rendering");
        }

        let data = this.dataSource.getSnapshot().map(this.dataSource.unwrap);

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