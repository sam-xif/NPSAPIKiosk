const axios = require('axios/index');

/**
 * Depends on Axios
 * @param api_key
 * @param api_endpoint
 * @constructor
 */
function NPSAPIProxy(api_key, api_endpoint) {
    this.api_key = api_key;
    this.api_endpoint = api_endpoint;

    /**
     * Gets data from the given resource in the NPS API
     * @param params
     * @return {Promise} A Promise that, when resolved, returns a JSON object with data
     */
    this.get = async function (resource, params) {
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
    };

    /**
     * Validates a URL parameters object for use with the NPS API.
     * @param {Object} params The parameters object to check.
     * @return {boolean} Whether the parameters object is valid.
     */
    this.validParams = function (params) {
        return "api_key" in params;
    };
}

/**
 *
 * @param resource
 * @param params
 * @constructor
 */
function NPSAPIQuery(resource, params) {
    this.resource = resource;
    this.params = params;

    /**
     *
     * @return {{resource: *, params: *}}
     */
    this.strip = function () {
        return {
            resource: this.resource,
            params: this.params
        };
    };

    /**
     * Executes this query using the given worker manager object to make calls to the API.
     * @param {NPSAPIWorkerManager} workerMgr The worker manager object to issue the request to
     * @return {Object} Response data
     */
    this.execute = async function (workerMgr) {
        let response = await (new Promise((resolve) => {
            workerMgr.request(this, resolve);
        }));

        return response;
    }
}


/**
 *
 * @param api_key
 * @constructor
 */
function NPSAPIQueryBuilder() {
    /**
     * Resets the Query Builder to its initial, default state.
     * @return {NPSAPIQueryBuilder} This instance.
     */
    this.reset = function () {
        this.parkCodes = [];
        this.queryString = null;
        this.limit = 50;
        return this;
    };

    this.reset();

    /**
     *
     * @param resource
     * @return {NPSAPIQueryBuilder}
     */
    this.from = function (resource) {
        this.resource = resource;
        return this;
    };

    /**
     *
     * @param parkCode
     * @return {NPSAPIQueryBuilder} This instance.
     */
    this.addParkCode = function (parkCode) {
        if (!this.parkCodes.includes(parkCode)) {
            this.parkCodes.push(parkCode);
        }
        return this;
    };

    /**
     *
     * @param parkCodeArr
     * @return {NPSAPIQueryBuilder}
     */
    this.addAllParkCodes = function (parkCodeArr) {
        parkCodeArr.forEach((parkCode) => {
            if (!this.parkCodes.includes(parkCode)) {
                this.parkCodes.push(parkCode);
            }
        });
        return this;
    };

    /**
     *
     * @param queryString
     * @return {NPSAPIQueryBuilder}
     */
    this.setQueryString = function (queryString) {
        this.queryString = queryString;
        return this;
    };

    /**
     *
     * @param {int} limit
     */
    this.setLimit = function (limit) {
        if (limit < 0) {
            throw new Error("Limit cannot be less than 0");
        }

        this.limit = limit;
        return this;
    };

    this.setStart = function (start) {
        if (start < 0) {
            throw new Error("Start cannot be less than 0");
        }
        this.start = start;
        return this;
    };

    /**
     * Builds the URL query parameters that are contained in this query builder.
     * @return {NPSAPIQuery} JSON object of URL query parameters
     */
    this.build = function () {
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

        if (this.queryString != null) {
            params["q"] = this.queryString;
        }

        return new NPSAPIQuery(this.resource, params);
    };
}

/**
 * Object that defines various matching predicates for the client API.
 * @type {Object}
 */
let Matchers = {
    /**
     * Returns a match predicate that matches any of the given terms.
     * @param {Array<String>} terms The list of terms to match any one of
     * @return {function(String): boolean} The match predicate, closed over the terms
     */
    anyOf : function (terms) {
        return function (item) {
            return terms.includes(item);
        };
    }
};

module.exports = {
    NPSAPIQuery : NPSAPIQuery,
    NPSAPIQueryBuilder : NPSAPIQueryBuilder,
    NPSAPIProxy : NPSAPIProxy,
    Matchers : Matchers
};
