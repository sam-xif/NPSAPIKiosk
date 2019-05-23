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
    let alertsCtrl = new AlertsController(API_ENDPOINT, API_KEY);
    alertsCtrl.initialize();
}


// TODO: Create a generic controller class with a mapping between template names and templates that utilizes the
//  command pattern.
/**
 *
 */
function AlertsController(api_endpoint, api_key) {
    let client = new NPSAPIQueryBuilder(api_endpoint);
    this.clientInterface = NPSAPIClientInterface(client);

    const ALERT_TEMPLATE = "<div><h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>";

    /**
     *
     * @return {Promise<void>}
     */
    this.initialize = async function() {
        let qb = new NPSAPIQueryBuilder(api_key);

        // Get parks
        let parkCodeMap = await this.clientInterface.getParkCodeMap(qb);

        // Get alerts
        let alerts = await this.clientInterface.getAllAlerts(parkCodeMap, qb);

        let renderer = new TemplateRenderer(ALERT_TEMPLATE);

        for (let i = 0; i < alerts.length; i++) {
            let alert = alerts[i]; //await alerts[i].fetchPark();
            renderer.renderToHTML("#slideshow-parent", [alert.url, alert.title, alert.description]);
        }

        // Set up alert slideshow
        function Divs() {
            let divs= $('#slideshow-parent div'),
                now = divs.filter(':visible') /*.not(':hover')*/,
                next = now.next().length ? now.next() : divs.first(),
                speed = 1500;

            now.fadeOut(speed);
            next.fadeIn(speed);
        }

        $(function () {
            setInterval(Divs, 5000);
        });
    }
}
