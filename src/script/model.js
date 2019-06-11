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
    constructor(source) {
        Object.assign(this, source);
    }

    /**
     * Gets a description of this NPS data object.
     * @return {String} A description
     */
    getDescription() {
        //throw new Error("'getDescription()' must be implemented on a subclass of NPSModel");
        return this.description;
    }

    /**
     * Gets a URL that links to more information about this NPS data object.
     * @return {String} A URL
     */
    getUrl() {
        return this.url;
    }

    /**
     * Gets a title that is fitting for this NPS data object.
     * @return {String} A title
     */
    getTitle() {
        return this.title;
    }

    /**
     * Asynchronously fetch {@link NPSModel} objects using the given {@link NPSAPIQuery} object.
     * @param {NPSAPIQuery} query The query to execute
     * @param {NPSAPIWorkerManager} workerMgr the worker manager to route the request to
     * @return {Array<NPSModel>|null} Array of model objects, or null if there are no items to be retrieved
     * @throws Error if the response could not be parsed
     */
    static async retrieve(query, workerMgr) {
        let response = await query.execute(workerMgr);

        if (!response.ok()) {
            throw new Error(response.getData());
        }

        let resource = response.getResource();
        let data = response.getData(); // This data is the actual API response in its entirety

        let out = [];

        let models = {
            'parks' : NPSPark,
            'alerts' : NPSAlert
        };

        if (response.totalPages() == 0) {
            return null;
        }

        if (response.pagesLeft() > 0) {
            data.forEach((obj) => {
                out.push(models[resource] !== undefined ? new models[resource](obj) : new NPSModel(obj));
            });
        } else {
            console.log("Hit end!"); // Debug msg
        }

        return out;
    }
}

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends NPSModel {
    /**
     * @param {JSON} source Source JSON object from the API to use to construct the object.
     */
    constructor(source) {
        super();
        Object.assign(this, source);
    }

    getDescription() {
        return this.description;
    }

    getUrl() {
        return this.url;
    }

    getTitle() {
        return this.title;
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

    getDescription() {
        return this.description;
    }

    getUrl() {
        return this.url;
    }

    getTitle() {
        return this.fullName;
    }

    /**
     *
     * @return {boolean}
     */
    hasImages() {
        return this.images !== undefined;
    }
}


// TODO: Write model classes for the rest of the resources


module.exports = {
    NPSModel : NPSModel,
    NPSPark : NPSPark,
    NPSAlert : NPSAlert
};
