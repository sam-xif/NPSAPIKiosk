/**
 * A data source object which can be dynamically written to and read from.
 */
export class NPSDataSource implements Iterable<any> {
  private data: Array<any>;
  private counter: number;
  private onUpdateCallbacks: Array<any>;
  private onCompletedCallbacks: Array<any>;

  constructor() {
    this.data = [];
    this.counter = 0;
    this.onUpdateCallbacks = [];
    this.onCompletedCallbacks = [];
  }

  [Symbol.iterator](): Iterator<any> {
    return this.getSnapshot()[Symbol.iterator]();
  }

  addOnCompletedHandler(fn) {
    this.onCompletedCallbacks.push(fn);
  }

  complete() {
    this.onCompletedCallbacks.forEach(fn => fn(this.getSnapshotRaw()));
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
  private fireOnUpdateEvent() {
    this.onUpdateCallbacks.forEach(fn => fn(this.getSnapshotRaw()));
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
    if (itemsArr && itemsArr.length > 0) {
      this.data = this.data.concat(itemsArr.map(item => this.wrap(item)));
      this.fireOnUpdateEvent();
    }
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
  getSnapshot(): Array<any> {
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
    return this.getSnapshot().map(item => this.unwrap(item));
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
    // @ts-ignore
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

  isEmpty() {
    return this.data.length === 0;
  }
}
