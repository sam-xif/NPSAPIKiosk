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
     * Adds a callback to the event which is fired every time this instance's data is changed.
     * @param {function(Array<{id:int, data: *}>): void} fn Callback function
     */
    addOnUpdateHandler(fn) {
        this.onUpdateCallbacks.push(fn);
    }

    /**
     * Fires the "on update" event.
     */
    fireOnUpdateEvent() {
        this.onUpdateCallbacks.forEach(fn => fn(this.getSnapshot()));
    }

    /**
     * Wraps a datum with an ID value assigned by this data source.
     * @param item The item to wrap
     * @return {{data: *, id: number}} The wrapped datum
     */
    wrap(item) {
        let wrapped = {
            id: this.counter,
            data: item
        };

        this.counter += 1;
        return wrapped;
    }

    /**
     * Unwraps a datum, returning the original contents. This is the inverse of <code>wrap()</code>.
     * @param item The datum to unwrap
     * @return {*} The original item
     */
    unwrap(item) {
        let unwrapped = item.data;
        return unwrapped;
    }

    /**
     * Adds an item to this data source.
     * @param item The item to add
     */
    add(item) {
        this.data.push(this.wrap(item));
        this.fireOnUpdateEvent();
    }

    /**
     * Adds all items in the given array to this data source.
     * @param {Array} itemsArr The array of items
     */
    addAll(itemsArr) {
        this.data = this.data.concat(itemsArr.map(item => this.wrap(item)));
        this.fireOnUpdateEvent();
    }

    /**
     * <p>
     *     Inserts the given item at the given index in this data source. This is useful to control the order in which
     *     items are displayed.
     * </p>
     * @param {int} index The index at which to insert
     * @param item The item to insert
     */
    insert(index, item) {
        this.data.splice(index, 0, this.wrap(item));
        this.fireOnUpdateEvent();
    }

    /**
     * Removes the item at the given index.
     * @param {int} index The index at which to remove
     */
    removeAt(index) {

    }

    /**
     * <p>
     *     Updates the item at the given index with the given item. This operation is a compound operation of a
     *     removal and an insertion.
     * </p>
     * @param index The index at which to update
     * @param newItem The new item to replace the old one
     */
    update(index, newItem) {
        this.removeAt(index);
        this.insert(index, newItem);
        this.fireOnUpdateEvent();
    }

    /**
     * Completely overwrites the data in this data source with data from the given array.
     * @param {Array} itemsArr The array to set as the new data
     */
    set(itemsArr) {
        this.data = itemsArr.map(item => this.wrap(item));
        this.fireOnUpdateEvent();
    }

    /**
     * <p>
     *     Gets a snapshot of the data in this data source. This is the principal way of reading the data.
     *     This method returns a shallow copy of the data, which is useful for saving previous states.
     * </p>
     * @return {Array} The snapshot of the data
     */
    getSnapshot() {
        return this.data.slice(0);
    }

    /**
     * <p>
     *     Gets a raw snapshot, where every datum has been unwrapped. Refer to the {@link wrap}() and {@link unwrap}()
     *     methods for more information on wrapping.
     * </p>
     * @return {Array} The raw snapshot of the data
     */
    getSnapshotRaw() {
        return this.getSnapshot.map(item => this.unwrap(item));
    }

    /**
     * <p>
     *     Returns a list of operations that, when applied to the given previous snapshot, will result in this
     *     instance's current state.
     * </p>
     * @param {Array} previousSnapshot The previous snapshot to compare against.
     * @return {Array} An array of discrete operations that represent all of the changes made
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
 * <p>
 *     Class that serves as a layer between the view and the controller. Widgets are initialized with an ID of a DOM
 *     element into which to render data fragments. The <code>bind()</code> method must be called before any rendering
 *     can occur. It assigns a {@link DataSource} and {@link Template} to a widget instance. Whenever new data must be
 *     rendered, <code>update()</code> or <code>render()</code> can be called to reflect changes on the view. See
 *     the JSDocs of those individual methods to see when to prefer one to the other.
 * </p>
 */
class Widget {
    /**
     * Creates a new widget instance that will be displayed in the DOM element with the given ID.
     * @param {String} containerId ID of the desired container of the widget
     */
    constructor(containerId) {
        this.containerID = containerId;
    }

    /**
     * <p>
     *     Binds this widget to the given {@link DataSource} and {@link Template} that is used to render
     *     data from the source. If the data source is already non-empty, those data are rendered immediately.
     * </p>
     * @param {DataSource} dataSource The data source object to read from
     * @param {Template} dataTemplate The template to use to render the data
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
     * @throws {Error} if this widget has not been bound to a {@link DataSource}
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
     * <p>
     *     Renders (or re-renders) data source in its current state. This is less efficient than update() because
     *     it always clears out all of the rendered fragments and re-renders everything, so it is recommended to use
     *     update() for repeated updates to the same dataset.
     * </p>
     * @throws {Error} if this widget has not been bound to a {@link DataSource}
     */
    render() {
        if (!this.dataSource || !this.dataTemplate) {
            throw new Error("Data must be bound before rendering");
        }

        let data = this.dataSource.getSnapshotRaw();

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
