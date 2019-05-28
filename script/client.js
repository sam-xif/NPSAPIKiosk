const axios = require('axios');

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
    this.get = function (resource, params) {
        if (!this.validParams(params)) throw new Error("Parameters object is invalid");

        params["api_key"] = this.api_key;
        return axios.get(this.api_endpoint + resource, {
            params: params
        });
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

function NPSAPIClient(api_key, api_endpoint) {
    this.client = new NPSAPIProxy(api_key, api_endpoint);
    this.buildingQuery = false;

    this.from = function (resource) {
        this.buildingQuery = true;
        this.query = new NPSAPIQueryBuilder(api_key, api_endpoint);
        this.query.setResource(resource);
        return this;
    };

    this.where = function (parameter) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        return this;
    };

    this.is = function (value) {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        return this;
    };

    this.select = function () {
        if (!this.buildingQuery) {
            throw new Error("Query is not being built.");
        }

        this.buildingQuery = false;
        return this.query.build().execute();
    };
}

function NPSAPIQuery(resource, params, api_key, api_endpoint) {
    this.resource = resource;
    this.proxy = new NPSAPIProxy(api_key, api_endpoint);

    this.params = params;

    this.execute = function () {
        return this.proxy.get(this.resource, this.params);
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

        return new NPSAPIQuery(this.resource, params, this.api_key, this.api_endpoint);
    };
}