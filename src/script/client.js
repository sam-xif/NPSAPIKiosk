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
     *
     * @return {{resource: *, params: *}}
     */
    strip() {
        return {
            resource: this.resource,
            params: this.params
        };
    }

    /**
     *
     * @param workerMgr
     * @return {Promise<any>}
     */
    async execute(workerMgr) {
        let response = await (new Promise((resolve) => {
            workerMgr.request(this, resolve);
        }));

        return response;
    }
}


/**
 * Constructs queries of type {@link NPSAPIQuery} that can be executed on the NPS API.
 */
class NPSAPIQueryBuilder {
    /**
     * @constructor
     */
    constructor() {
        this.reset();
    }

    /**
     *
     * @return {NPSAPIQueryBuilder}
     */
    reset() {
        this.parkCodes = [];
        this.queryString = null;
        this.limit = 50;
        this.start = 0;
        return this;
    }

    /**
     *
     * @param parkCodeArr
     * @return {NPSAPIQueryBuilder}
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
     *
     * @param parkCode
     * @return {NPSAPIQueryBuilder}
     */
    addParkCode(parkCode) {
        if (!this.parkCodes.includes(parkCode)) {
            this.parkCodes.push(parkCode);
        }
        return this;
    }

    /**
     *
     * @param queryString
     * @return {NPSAPIQueryBuilder}
     */
    setQueryString(queryString) {
        this.queryString = queryString;
        return this;
    }

    /**
     *
     * @return {NPSAPIQueryBuilder}
     */
    nextPage() {
        this.start += 1;
        return this;
    }

    /**
     *
     * @param limit
     * @return {NPSAPIQueryBuilder}
     */
    setLimit(limit) {
        if (limit < 0) {
            throw new Error("Limit cannot be less than 0");
        }

        this.limit = limit;
        return this;
    }

    /**
     *
     * @param start
     * @return {NPSAPIQueryBuilder}
     */
    setStart(start) {
        if (start < 0) {
            throw new Error("Start cannot be less than 0");
        }
        this.start = start;
        return this;
    }

    /**
     *
     * @param resource
     * @return {NPSAPIQueryBuilder}
     */
    from(resource) {
        this.resource = resource;
        return this;
    }

    /**
     *
     * @return {NPSAPIQuery}
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

        if (this.queryString != null) {
            params["q"] = this.queryString;
        }

        return new NPSAPIQuery(this.resource, params);
    }
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
