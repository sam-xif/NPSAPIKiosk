const client = require('client');

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
}

/**
 * Parses raw {@code JSON} data from the API into an {@link NPSModel} or a collection of {@link NPSModel}s.
 * @param {JSON} rawData Raw {@code JSON} data
 * @return {NPSModel|Array} {@link NPSModel} if there is one datum, {@link Array} if there is more than one.
 */
NPSModel.parse = function (rawData) {
    let total = rawData.total;

    if (total == 0) {
        throw new Error("No data to be parsed");
    }

    if (total == 1) {
        let datum = rawData.data.data[0];
        return new NPSModel(datum.parkCode, datum.url, datum);
    }

    let data = rawData.data;
    let out = [];
    data.forEach((datum) => {
        out.push(new NPSModel(datum.parkCode, datum.url, datum));
    });
    return out;
};

/**
 *
 * @param {NPSAPIQuery} query
 */
NPSModel.retrieve = async function (query, workerMgr) {
    let response = await query.execute(workerMgr);

    if (response.status === 'error') {
        throw new Error(response.data);
    }

    let resource = response.reqResource;
    let data = response.data; // This data is the actual API response in its entirety

    let out = [];

    switch (resource) {
        case 'parks':
            data.data.forEach((parkObj) => {
                out.push(new NPSPark(parkObj));
            });
            break;
        case 'alerts':
            data.data.forEach((alertObj) => {
                out.push(new NPSAlert(alertObj));
            });
            break;
        default:
            throw new Error("Unsupported resource");
    }

    return out;
};

/**
 * An alert issued by the NPS.
 * @param {JSON} source Source {@code JSON} object from the API to use to construct the object.
 * @param {JSON?} parkCodeMap Optional park code map to use to find the corresponding
 *                 {@link NPSPark} instance.
 * @constructor Creates a new instance from the given source.
 */
function NPSAlert(source, parkCodeMap) {
    let parkCode = source.parkCode;
    let url = source.url;

    this.__proto__ = new NPSModel(parkCode, url);

    this.category = source.category;
    this.description = source.description;
    this.id = source.id;
    this.title = source.title;

    if (parkCodeMap !== undefined && parkCode in parkCodeMap) {
        this.park = parkCodeMap[parkCode];
    }

    // /**
    //  * Obtains a Promise which resolves to a new {@code NPSAlert} instance that has the {@code park} field defined
    //  *  as the park corresponding to this instance's parkCode.
    //  * @return {Promise<NPSAlert>} The promise
    //  */
    // this.fetchPark = function () {
    //     return (async function (alertInstance) {
    //         let park = await (new NPSAPIClientInterface(new NPSAPIClient())) // TODO: Remove this to decouple model from client
    //             .parkFromCode(alertInstance.parkCode);
    //         alertInstance.park = park;
    //         return alertInstance;
    //     })(this);
    // };

    /**
     * Given a mapping from park codes to {@link NPSPark}s, attempts to find the park represented by this instance's
     *  park code.
     * @param parkCodeMap
     */
    this.linkPark = function (parkCodeMap) {
        if (this.parkCode in parkCodeMap) {
            this.park = parkCodeMap[this.parkCode];
        }
    };
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


module.exports = {
    NPSModel : NPSModel,
    NPSPark : NPSPark,
    NPSAlert : NPSAlert
};
