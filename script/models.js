/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */

/**
 * Base class for models of data objects from the NPS API.
 * @param parkCode The park code associated with this piece of data
 * @param url The url associated with this piece of data
 * @param data JSON object of other data (optional)
 * @constructor Creates a new model instance
 */
function NPSModel(parkCode, url, data) {
    this.parkCode = parkCode;
    this.url = url;
    this.data = data;

    /**
     * Renders this Data to HTML. This method is an abstract definition
     */
    this.render = function() { throw new Error("Attempted to call abstract function."); }
}

/**
 *
 * @param source
 * @constructor
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

    this.park = (new NPSAPIClientInterface()).parkFromCode(this.parkCode);
}

/**
 *
 * @param source
 * @constructor
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