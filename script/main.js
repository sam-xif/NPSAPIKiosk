const api = require('./client');
const model = require('./model');
const view = require('./view');

/**
 * Entry point and controller logic.
 */

// TODO: Do not put API key directly in source code
const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

/**
 * Function that gets called when the page is loaded.
 */
function onPageLoad() {
    //let ctrl = new Controller(API_ENDPOINT, API_KEY);
    //ctrl.initializeView();
    //ctrl.renderAlerts();


    (async function () {
        let client = new api.NPSAPIClient(API_KEY, API_ENDPOINT);
        // First, obtain a list of alerts to view
        let alerts = await client
            .from("alerts")
            .pageSize(50)
            .page(0)
            .select();

        console.log(alerts);

        // Next, get all unique parks from these alerts
        let uniqueParks = [];
        alerts.forEach((elem) => {
            if (!uniqueParks.includes(elem.parkCode)) {
                uniqueParks.push(elem.parkCode);
            }
        });

        console.log(uniqueParks);

        let parks = (await client
            .from("parks")
            .where("parkCode")
            .is(api.Matchers.anyOf(uniqueParks))
            .select())
            .reduce((parkMap, nextPark) => {
                parkMap[nextPark.parkCode] = new model.NPSPark(nextPark);
                return parkMap;
            }, {});

        console.log(parks);
    })();
}

module.exports = {
    onPageLoad : onPageLoad
};