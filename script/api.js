/**
 * This file defines objects which act as clients to the NPS API.
 */

// TODO: Do not put API key directly in source code
let API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
let API_ENDPOINT = "https://developer.nps.gov/api/v1/";

/**
 * Simple client for the National Park Services API. All of the functions execute asynchronously.
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
    };
}

/**
 * High-level interface with the {@link NPSAPIClient} class. Mainly serves to create {@link NPSModel}s from the
 *  data obtained from the API.
 * @constructor Constructs a new {@code NPSAPIClientInterface} instance.
 */
function NPSAPIClientInterface(client) {
    if (client === undefined) {
        throw new Error("Expected client object to be passed to constructor.");
    }

    this.clientInstance = client;

    /**
     * Gets a park object from the given park code. This function runs asynchronously.
     * @param {String} parkCode The park code to search
     * @param {(function(park: NPSPark): void)?} callback Optional callback function that is executed when the park object is obtained.
     *                              The park object is passed into this function.
     * @returns {Promise} A Promise that resolves to an {@link NPSPark} object corresponding to the given park code,
     *                    or rejects with an error if the parkCode is not valid
     */
    this.parkFromCode = async function (parkCode, callback) {
        let response = await this.clientInstance.parkInfo(parkCode);
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
}

let clientInterface = new NPSAPIClientInterface(new NPSAPIClient());
let alert = new NPSAlert({parkCode: "acad"}).fetchPark().then((park) => {
    console.log(park);
});