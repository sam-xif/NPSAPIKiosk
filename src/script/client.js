const axios = require('axios/index');

/**
 * Routes API requests to the given NPS API endpoint using the given API key.
 */
class NPSAPIProxy {
    /**
     * @param api_key The API key to use
     * @param api_endpoint The API endpoint to access
     * @constructor
     */
    constructor(api_key, api_endpoint) {
        this.api_key = api_key;
        this.api_endpoint = api_endpoint;

    }

    async get(resource, params) {
        params["api_key"] = this.api_key;
        let result = await axios.get(this.api_endpoint + resource, {
            params: params
        });

        if (result.status === 200) {
            return result.data;
        } else {
            // error
            throw new Error("Resource could not be retrieved; status = " + result.status);
        }
    }
}

/**
 * Represents an NPS API query that can be executed.
 */
class NPSAPIQuery {
    /**
     * @param resource The API resource to query
     * @param params The query parameters
     * @constructor
     */
    constructor(resource, params) {
        this.resource = resource;
        this.params = params;

    }

    /**
     * Strips down this query object into a simple object with just resource and params fields.
     * @return {{resource: *, params: *}}
     */
    strip() {
        return {
            resource: this.resource,
            params: this.params
        };
    }

    capture(response) {
        if (response.status === 'error') {
            this.status = response.status;
            return;
        }

        let data = response.data;

    }

    /**
     * Executes this query by sending a request to the given API worker manager.
     * @param {NPSAPIWorkerManager} workerMgr The worker manager
     * @return {Promise<NPSAPIResponse>} The response object
     */
    async execute(workerMgr) {
        let response = await (new Promise((resolve) => {
            workerMgr.request(this, (response) => { this.capture(response); resolve(response); });
        }));

        return response;
    }
}


/**
 * Model of a response received from the NPS API.
 */
class NPSAPIResponse {
    /**
     * @param status The status of the response
     * @param resource The resource from which the response was retrieved
     * @param start The start index of the response
     * @param limit The limit of the response
     * @param total The total number of elements in the resource
     * @param data The data of the response
     */
    constructor(status, resource, start, limit, total, data) {
        this.status = status;
        this.resource = resource;
        this.start = start;
        this.limit = limit;
        this.total = total;
        this.data = data;
    }

    /**
     * Gets the total number of pages at the resource accessed.
     * @return {number}
     */
    totalPages() {
        return Math.ceil(this.total / this.limit);
    }

    /**
     * Gets the current page based on the query parameters
     * @return {number}
     */
    currentPage() {
        return this.start / this.limit;
    }

    /**
     * Gets the number of pages left based on the query parameters
     * @return {number}
     */
    pagesLeft() {
        return this.totalPages() - this.currentPage();
    }

    /**
     * Checks whether the response has an OK status.
     * @return {boolean}
     */
    ok() {
        return this.status === 'ok';
    }

    /**
     * <p>
     *     Gets the data of this response. This method should only be expected to return a defined value if this.ok()
     *     is true.
     * </p>
     * @return {Object} The data of this response
     */
    getData() {
        return this.data;
    }

    /**
     * Gets the resource that was accessed.
     * @return {String}
     */
    getResource() {
        console.log(this.resource);
        return this.resource;
    }

    /**
     * Constructs an {@link NPSAPIResponse} object from raw data.
     * @param raw A response object as received from an {@link NPSAPIWorkerManager}.
     * @return {NPSAPIResponse} The new object
     * @throws Error if parsing the data failed
     */
    static from(responseObj) {
        if (responseObj.status === undefined) {
            throw new Error("Cannot parse malformed response. Expected a 'status' property.");
        }

        return new NPSAPIResponse(responseObj.status,
            responseObj.reqResource,
            responseObj.data.start,
            responseObj.data.limit,
            responseObj.data.total,
            responseObj.data.data);
    }
}


/**
 * Factory for {@link NPSAPIQuery} objects that can be executed on the NPS API.
 */
class NPSAPIQueryBuilder {
    constructor() {
        this.reset();
    }

    /**
     * Resets this query builder to its initial state.
     * @return {NPSAPIQueryBuilder} This instance, with its fields reset
     */
    reset() {
        this.parkCodes = [];
        this.queryString = null;
        this.limit = 50;
        this.start = 0;
        return this;
    }

    /**
     * Adds all park codes in the given array to the query.
     * @param {Array<String>} parkCodeArr The array of park codes to add
     * @return {NPSAPIQueryBuilder} This instance
     */
    addAllParkCodes(parkCodeArr) {
        parkCodeArr.forEach((parkCode) => {
            if (!this.parkCodes.includes(parkCode)) {
                this.parkCodes.push(parkCode);
            }
        });
        return this;
    }

    /**
     * Adds a single park code to the query.
     * @param {String} parkCode The park code
     * @return {NPSAPIQueryBuilder} This instance
     */
    addParkCode(parkCode) {
        if (!this.parkCodes.includes(parkCode)) {
            this.parkCodes.push(parkCode);
        }
        return this;
    }

    /**
     * Sets the query string.
     * @param {String} queryString The query string
     * @return {NPSAPIQueryBuilder} This instance
     */
    setQueryString(queryString) {
        this.queryString = queryString;
        return this;
    }

    /**
     * Advances the query by one page. Makes it extremely easy to chain queries to obtain multiple pages.
     * @example
     * let qb = new NPSAPIQueryBuilder();
     * let response1 = qb.from("parks").build().execute();
     * let response2 = qb.nextPage().build().execute();
     *
     * @return {NPSAPIQueryBuilder} This instance
     */
    nextPage() {
        this.start += this.limit;
        return this;
    }

    /**
     * Sets the limit.
     * @param {int} limit The limit
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the limit is less than 0
     */
    setLimit(limit) {
        if (limit < 0) {
            throw new Error("Limit cannot be less than 0");
        }

        this.limit = limit;
        return this;
    }

    /**
     * Sets the start index.
     * @param {int} start The start index
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the start index is less than 0
     */
    setStart(start) {
        if (start < 0) {
            throw new Error("Start cannot be less than 0");
        }
        this.start = start;
        return this;
    }

    /**
     * Sets the resource from which to retrieve data.
     * @param {String} resource The resource string
     * @return {NPSAPIQueryBuilder} This instance
     */
    from(resource) {
        this.resource = resource;
        return this;
    }

    /**
     * Builds a new query object based on the current configuration.
     * @return {NPSAPIQuery} The query object
     */
    build() {
        let params = {};

        if (this.parkCodes.length > 0) {
            params["parkCode"] = ((parkCodes) => {
                let out = "";
                for (let i = 0; i < parkCodes.length; i++) {
                    if (i < parkCodes.length - 1) {
                        out += parkCodes[i] + ",";
                    } else {
                        out += parkCodes[i];
                    }
                }
                return out;
            })(this.parkCodes);
        }

        params["limit"] = this.limit;
        params["start"] = this.start;

        if (this.queryString != null) {
            params["q"] = this.queryString;
        }

        return new NPSAPIQuery(this.resource, params);
    }
}


module.exports = {
    NPSAPIQuery : NPSAPIQuery,
    NPSAPIQueryBuilder : NPSAPIQueryBuilder,
    NPSAPIProxy : NPSAPIProxy,
    NPSAPIResponse: NPSAPIResponse
};
