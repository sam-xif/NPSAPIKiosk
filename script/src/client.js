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
        // TODO: Remove this check if api key is added in next line
        if (!this.validParams(params)) throw new Error("Parameters object is invalid");

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
 * National Park Service API Client that provides a fluent, SQL-like interface for accessing the API's data.
 *
 * @param api_key
 * @param api_endpoint
 * @constructor
 */
function NPSAPIClient(api_key, api_endpoint) {
    this.client = new NPSAPIProxy(api_key, api_endpoint);
    this.buildingQuery = false;

    const DEFAULT_PAGE_SIZE = 50;
    const DEFAULT_MAX_RESULTS = 200;

    this.filters = {};

    /**
     *
     * @param resource
     * @return {NPSAPIClient}
     */
    this.from = function (resource) {
        this.buildingQuery = true;
        this.query = new NPSAPIQueryBuilder(api_key, api_endpoint);
        this.query.setResource(resource);
        return this;
    };

    /**
     *
     * @param parameter
     * @return {NPSAPIClient}
     */
    this.where = function (parameter) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        this.filters[parameter] = null;

        return this;
    };

    /**
     *
     * @param {String|function(String): boolean} match
     * @return {NPSAPIClient}
     */
    this.is = function (match) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        let unassignedFilters = [];
        for (let parameter in this.filters) {
            if (this.filters[parameter] === null) {
                unassignedFilters.push(parameter);
            }
        }

        if (unassignedFilters.length > 1) {
            throw new Error("Multiple calls to where() detected, must call is() for each call to where().");
        } else if (unassignedFilters.length === 0) {
            throw new Error("Expected call to where() before call to is()");
        }

        // Now, unassignedFilters is assumed to have length of 1

        if (typeof match === 'string') {
            this.filters[unassignedFilters[0]] = function (term) {
                return term === match;
            };
        } else if (typeof match === 'function') {
            this.filters[unassignedFilters[0]] = match;
        } else {
            // error
        }

        return this;
    };

    /**
     *
     * @return {Promise<Array<Object>>}
     */
    this.select = async function () {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        this.buildingQuery = false;
        let results = (await this.query.build().execute()).data;
        console.log(results);
        // Apply filters then return the result
        for (let property in this.filters) {
            results = results.filter(result => {
                return this.filters[property](result[property]);
            });
        }

        return results;
    };

    /**
     *
     * @param pageSize
     * @return {NPSAPIClient}
     */
    this.pageSize = function (pageSize) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        this.pageSize = pageSize;
        this.query.setLimit(pageSize);
        return this;
    };

    /**
     *
     * @param pageNum
     * @return {NPSAPIClient}
     */
    this.page = function (pageNum) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        if (this.pageSize !== undefined) {
            this.query.setStart(this.pageSize * pageNum);
        } else {
            this.query.setStart(DEFAULT_PAGE_SIZE * pageNum); // Use the default
        }
        return this;
    };
}

/**
 *
 * @param resource
 * @param params
 * @param api_key
 * @param api_endpoint
 * @constructor
 */
function NPSAPIQuery(resource, params, api_key, api_endpoint) {
    this.resource = resource;
    this.proxy = new NPSAPIProxy(api_key, api_endpoint);

    this.params = params;

    /**
     *
     * @return {Promise<Array<Object>>}
     */
    this.execute = async function () {
        return await this.proxy.get(this.resource, this.params);
    };
}


/**
 *
 * @param api_key
 * @constructor
 */
function NPSAPIQueryBuilder(api_key, api_endpoint) {
    if (api_key === undefined) {
        throw new Error("API key must be passed to constructor");
    }

    this.api_key = api_key;
    this.api_endpoint = api_endpoint;

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

    this.setResource = function (resource) {
        this.resource = resource;
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

        params["api_key"] = this.api_key;

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

        return new NPSAPIQuery(this.resource, params, this.api_key, this.api_endpoint);
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
    NPSAPIClient : NPSAPIClient,
    NPSAPIQuery : NPSAPIQuery,
    NPSAPIQueryBuilder : NPSAPIQueryBuilder,
    NPSAPIProxy : NPSAPIProxy,
    Matchers : Matchers
};
