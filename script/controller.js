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
    let ctrl = new Controller(API_ENDPOINT, API_KEY);
    ctrl.initializeView();
    ctrl.renderAlerts();
}

function Controller(api_endpoint, api_key) {
    this.renderer = new TemplateRenderer();
    this.queryBuilder = new NPSAPIQueryBuilder(api_key);

    let client = new NPSAPIClient(api_endpoint);
    this.clientInterface = new NPSAPIClientInterface(client);

    this.initializeView = function() {
        this.renderer.registerTemplate("alert",
            "<div><h4><a href=\"{0}\">{1} at {2}</a></h4><p>{3}</p></div>");
    };

    this.renderAlerts = async function() {
        // First, obtain a list of alerts to view
        let alerts = await this.clientInterface.getAllAlerts(this.queryBuilder.setLimit(25));

        // Next, get all unique parks from these alerts
        let uniqueParks = [];
        alerts.forEach((elem) => {
            if (!uniqueParks.includes(elem.parkCode)) {
                uniqueParks.push(elem.parkCode);
            }
        });

        let parks = await this.clientInterface.getParkCodeMap(this.queryBuilder.addAllParkCodes(uniqueParks));

        // Now, link alerts with their respective parks
        alerts.forEach((elem) => {
            elem.linkPark(parks);
        });

        for (let i = 0; i < alerts.length; i++) {
            let alert = alerts[i]; //await alerts[i].fetchPark();
            this.renderer.renderToHTML("#slideshow-parent",
                "alert",
                [alert.url, alert.title, alert.park.fullName, alert.description]);
        }

        ViewUtil.createSlideshow("#slideshow-parent", 1500, 6000);
    }
}
