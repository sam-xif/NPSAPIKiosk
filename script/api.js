/**
 *
 */

// TODO: Do not put API key directly in source code
let API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
let API_ENDPOINT = "https://developer.nps.gov/api/v1/";

/**
 * Simple client for the National Park Services API
 * @constructor creates a client instance
 */
function NPSAPIClient() {
    /**
     * Obtains the alerts issued by the NPS.
     * @returns {Promise} A Promise that, when resolved, returns a JSON object with data
     */
    this.alerts = function () {
        return axios.get(API_ENDPOINT + "alerts", {
            params: {
                "api_key": API_KEY
            }
        });
    };

    /**
     * Gets park info.
     * @param {String} parkCode The four-letter park code
     * @returns {Promise} A Promise that, when resolved, returns a JSON object with data
     */
    this.parkInfo = function (parkCode) {
        return axios.get(API_ENDPOINT + "parks", {
            params: {
                "api_key": API_KEY,
                "parkCode": parkCode
            }
        });
    }
}

/**
 *
 * @constructor
 */
function NPSAPIClientInterface() {
    this.clientInstance = new NPSAPIClient();

    /**
     * Gets a park object from the given park code. This function runs asynchronously.
     * @param parkCode The park code to search
     * @returns {NPSPark} An {@link NPSPark} object corresponding to the given park code, or null if
     */
    this.parkFromCode = async function (parkCode) {
        let response = await this.clientInstance.parkInfo(parkCode);
        let responseArr = response.data.data;

        if (responseArr.length < 1) {
            throw new Error("No park found with given code.");
        }

        return new NPSPark(response.data.data[0]);
    }
}


let interface = new NPSAPIClientInterface();
(async function () {
    console.log(await interface.parkFromCode("acad"));
})();