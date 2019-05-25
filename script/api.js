/**
 * This file defines objects which act as clients to the NPS API.
 */

// TODO: Make this class depend on a proxy that routes requests to axios so that the API can be mocked more easily
//  for testing.
/**
 * Simple client for the National Park Services API. All of the functions execute asynchronously.
 * Depends on Axios.
 * @constructor creates a client instance
 */
function NPSAPIClient(endpoint) {

    /**
     * The API endpoint to access.
     * @type {String}
     */
    this.endpoint = endpoint;

    /**
     * Validates a URL parameters object for use with the NPS API.
     * @param {Object} params The parameters object to check.
     * @return {boolean} Whether the parameters object is valid.
     */
    this.validParams = function (params) {
        return "api_key" in params;
    };

    /**
     * Obtains the alerts issued by the NPS.
     * @param params
     * @return {Promise} A Promise that, when resolved, returns a JSON object with data
     */
    this.alerts = function (params) {
        if (!this.validParams(params)) throw new Error("Parameters object is invalid");

        return axios.get(this.endpoint + "alerts", {
            params: params
        });
    };

    /**
     * Gets park info.
     * @param {String} parkCode The four-letter park code
     * @return {Promise} A Promise that, when resolved, returns a JSON object with data
     */
    this.parkInfo = function (parkCode, params) {
        if (!this.validParams(params)) throw new Error("Parameters object is invalid");

        params.parkCode = parkCode;
        return axios.get(this.endpoint + "parks", {
            params: params
        });
    };

    /**
     * Gets all parks.
     * @return {Promise} A Promise that, when resolved returns a JSON object with data of all the parks
     */
    this.parks = function (params) {
        if (!this.validParams(params)) throw new Error("Parameters object is invalid");

        return axios.get(this.endpoint + "parks", {
            params: params
        });
    };
}

/**
 * High-level interface with the {@link NPSAPIClient} class. Mainly serves to create {@link NPSModel}s from the
 *  data obtained from the API.
 * @param {NPSAPIClient} client The client object to wrap around.
 * @constructor Constructs a new {@code NPSAPIClientInterface} instance.
 */
function NPSAPIClientInterface(client) {
    if (client === undefined) {
        throw new Error("Expected client object to be passed to constructor.");
    }

    /**
     * The instance of the API client.
     * @type {NPSAPIClient}
     */
    this.clientInstance = client;

    /**
     * Gets a park object from the given park code. This function runs asynchronously.
     * @param {String} parkCode The park code to search
     * @param {NPSAPIQueryBuilder} query The query builder to use.
     * @param {(function(park: NPSPark): void)?} callback Optional callback function that is executed when the park object is obtained.
     *                              The park object is passed into this function.
     * @return {Promise} A Promise that resolves to an {@link NPSPark} object corresponding to the given park code,
     *                    or rejects with an error if the parkCode is not valid
     */
    this.parkFromCode = async function (parkCode, query, callback) {
        let response = await this.clientInstance.parkInfo(parkCode, query.build());
        let responseArr = response.data.data;

        if (responseArr.length < 1) {
            throw new Error("No park found with given code.");
        }

        let park = new NPSPark(response.data.data[0]);
        if (callback !== undefined) {
            callback(park);
        }
        return park;
    };

    /**
     * Queries the API to get an array of all active alerts. This function runs asynchronously.
     * @param {NPSAPIQueryBuilder} query The query builder to use.
     * @param {JSON?} parkCodeMap Optional park code map to use when creating {@link NPSAlert} objects from
     *                  the received API data.
     * @return {Promise<Array>} A promise of an array of {@link NPSAlert}s
     */
    this.getAllAlerts = async function (query, parkCodeMap) {
        let response =
            await this.clientInstance.alerts(query.build());
        let alertArr = [];
        response.data.data.forEach((alert) => {
            alertArr.push(new NPSAlert(alert, parkCodeMap !== undefined ? parkCodeMap : undefined));
        });
        return alertArr;
    };

    /**
     * Constructs a map from 4-letter park code strings to {@link NPSPark} objects.
     * To customize what park codes are included in the output, add codes to the query builder before passing it.
     * @param {NPSAPIQueryBuilder} query The query builder to use.
     * @return {Promise<JSON>}
     */
    this.getParkCodeMap = async function (query) {
        let response = await this.clientInstance.parks(query.build());
        let parkMap = {};
        response.data.data.forEach((park) => {
            parkMap[park.parkCode] = new NPSPark(park);
        });
        return parkMap;
    }
}

/**
 *
 * @param api_key
 * @constructor
 */
function NPSAPIQueryBuilder(api_key) {
    if (api_key === undefined) {
        throw new Error("API key must be passed to constructor");
    }

    this.api_key = api_key;

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
     * @return {JSON} JSON object of URL query parameters
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

        return params;
    };
}

module.exports = {
    NPSAPIClient : NPSAPIClient,
    NPSAPIClientInterface : NPSAPIClientInterface,
    NPSAPIQueryBuilder : NPSAPIQueryBuilder
};
