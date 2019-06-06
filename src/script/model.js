const client = require('client');

/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */

/**
 * Abstract base class for models of data objects from the NPS API.
 */
class NPSModel {
    /**
     * @constructor
     */
    constructor() {}

    /**
     * Gets a description of this NPS data object.
     * @return {String} A description
     */
    description() {
        throw new Error("'description()' must be implemented on a subclass of NPSModel");
    }



    /**
     * Parses raw {@code JSON} data from the API into an {@link NPSModel} or a collection of {@link NPSModel}s.
     * @param {JSON} rawData Raw {@code JSON} data
     * @return {NPSModel|Array} {@link NPSModel} if there is one datum, {@link Array} if there is more than one.
     */
    static parse(rawData) {
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
    }

    /**
     * Asynchronously fetch {@link NPSModel} objects using the given {@link NPSAPIQuery} object.
     * @param {NPSAPIQuery} query The query to execute
     * @param {NPSAPIWorkerManager} workerMgr the worker manager to route the request to
     */
    static async retrieve(query, workerMgr) {
        let response = await query.execute(workerMgr);

        if (response.status === 'error') {
            throw new Error(response.data);
        }

        let resource = response.reqResource;
        let data = response.data; // This data is the actual API response in its entirety

        let out = [];

        let models = {
            'parks' : NPSPark,
            'alerts' : NPSAlert
        };

        data.data.forEach((parkObj) => {
            out.push(new models[resource](parkObj));
        });

        return out;
    }
}

class NPSAlert extends NPSModel {
    /**
     * An alert issued by the NPS.
     * @param {JSON} source Source {@code JSON} object from the API to use to construct the object.
     * @param {JSON?} parkCodeMap Optional park code map to use to find the corresponding
     *                 {@link NPSPark} instance.
     * @constructor
     */
    constructor(source, parkCodeMap) {
        super();
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
    }

    description() {
        return this.description;
    }
}

class NPSPark extends NPSModel {
    /**
     * A park in the NPS's database.
     * @param source Source JSON object from the API to use to construct the object.
     * @constructor
     */
    constructor(source) {
        super();
        let parkCode = source.parkCode;
        let url = source.url;

        this.__proto__ = new NPSModel(parkCode, url);

        this.fullName = source.fullName;
        this.name = source.name;
        this.states = source.states;
        this.description = source.description;
        this.weatherInfo = source.weatherInfo;
    }

    description() {
        return this.description;
    }
}


module.exports = {
    NPSModel : NPSModel,
    NPSPark : NPSPark,
    NPSAlert : NPSAlert
};
