/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */

/**
 * Abstract base class for models of data objects from the NPS API.
 */
class NPSModel {
    /**
     * @param {JSON} source Source JSON object from the API to use to construct the object
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
     * @param {function(boolean, Array<NPSModel>): void ?} callback Optional callback that is called when the data
     *                                                     is obtained. The first parameter is a boolean value that is
     *                                                     true if and only if the operation succeeded.
     * @return {Array<NPSModel>|null} Array of model objects, or null if there are no items to be retrieved
     * @throws Error if the response could not be parsed
     */
    static async retrieve(query, workerMgr, callback) {
        let response = await query.execute(workerMgr);

        if (!response.ok()) {
            if (callback) {
                callback(response.ok(), null);
            }

            throw new Error(response.getData());
        }

        let resource = response.getResource();
        let data = response.getData(); // This data is the actual API response in its entirety

        let out = [];

        let models = {
            'parks' : NPSPark,
            'alerts' : NPSAlert,
            'newsreleases' : NPSNewsRelease
        };

        if (response.totalPages() == 0) {
            return null;
        }

        if (response.pagesLeft() > 0) {
            data.forEach((obj) => {
                out.push(models[resource] !== undefined ? new models[resource](obj) : new NPSModel(obj));
            });
        }

        if (callback) {
            callback(response.ok(), out);
        }

        return out;
    }
}

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends NPSModel {
    /**
     * @param {JSON} source Source JSON object from the API to use to construct the object
     */
    constructor(source) {
        super(source);
    }
}

/**
 * Data model of a park in the NPS's database.
 */
class NPSPark extends NPSModel {
    /**
     * @param source Source JSON object from the API to use to construct the object
     */
    constructor(source) {
        super(source);
    }

    getTitle() {
        return this.fullName;
    }

    /**
     * Checks whether this park instances has images associated with it.
     * @return {boolean}
     */
    hasImages() {
        return this.images !== undefined;
    }
}

/**
 *
 */
class NPSNewsRelease extends NPSModel {
    constructor(source) {
        super(source);
    }

    getDescription() {
        return this.abstract;
    }
}


// TODO: Write model classes for the rest of the resources


module.exports = {
    NPSModel : NPSModel,
    NPSPark : NPSPark,
    NPSAlert : NPSAlert
};
