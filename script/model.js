/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */

/**
 * Base class for models of data objects from the NPS API.
 * @param parkCode The park code associated with this piece of data
 * @param url The url associated with this piece of data
 * @param data JSON object of other data (optional)
 * @constructor Creates a new model instance.
 */
function NPSModel(parkCode, url, data) {
    this.parkCode = parkCode;
    this.url = url;
    this.data = data;

    /**
     * Renders this Data to HTML. This method is left to be implemented by subclasses.
     */
    this.render = function() { throw new Error("Attempted to call abstract function."); }
}

/**
 * An alert issued by the NPS.
 * @param source Source JSON object from the API to use to construct the object.
 * @constructor Creates a new instance from the given source.
 */
function NPSAlert(source) {
    let parkCode = source.parkCode;
    let url = source.url;

    // Set up inheritance
    this.__proto__ = new NPSModel(parkCode, url);

    this.category = source.category;
    this.description = source.description;
    this.id = source.id;
    this.title = source.title;

    /**
     * Obtains a Promise which resolves to a new {@code NPSAlert} instance that has the {@code park} field defined
     *  as the park corresponding to this instance's parkCode.
     * @return {Promise} The promise
     */
    this.fetchPark = function () {
        return (async function (alertInstance) {
            let park = await (new NPSAPIClientInterface(new NPSAPIClient()))
                .parkFromCode(alertInstance.parkCode);
            alertInstance.park = park;
            return alertInstance;
        })(this);
    }
}

/**
 * A park in the NPS's database.
 * @param source Source JSON object from the API to use to construct the object.
 * @constructor Creates a new instance from the given source.
 */
function NPSPark(source) {
    let parkCode = source.parkCode;
    let url = source.url;

    this.__proto__ = new NPSModel(parkCode, url);

    this.fullName = source.fullName;
    this.name = source.name;
    this.states = source.states;
    this.description = source.description;
    this.weatherInfo = source.weatherInfo;
}
