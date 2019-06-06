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

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends NPSModel {
    /**
     * @param {JSON} source Source {@code JSON} object from the API to use to construct the object.
     * @param {JSON?} parkCodeMap Optional park code map to use to find the corresponding
     *                 {@link NPSPark} instance.
     * @constructor
     */
    constructor(source) {
        super();
        Object.assign(this, source);
    }

    description() {
        return this.description;
    }
}

/**
 * Data model of a park in the NPS's database.
 */
class NPSPark extends NPSModel {
    /**
     * @param source Source JSON object from the API to use to construct the object.
     * @constructor
     */
    constructor(source) {
        super();
        Object.assign(this, source);
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
