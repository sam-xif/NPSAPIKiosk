const view = require('view');
const client = require('client');
const model = require('model');
const worker = require('worker');

/**
 *
 * @param api_endpoint
 * @param api_key
 * @constructor
 */
function Controller(api_endpoint, api_key) {
    this.renderer = new view.TemplateRenderer();
    this.qb = new client.NPSAPIQueryBuilder();
    this.workerMgr = new worker.NPSAPIWorkerManager('script/dist/worker.js');

    //this.client = new client.NPSAPIClient(api_key, api_endpoint);

    this.initializeView = function() {
        this.renderer.registerTemplate("alert",
            '<div class="alert"><h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>');
    };

    this.renderAlerts = async function() {
        // Set limit to 25
        //this.queryBuilder.setLimit(25);

        // First, obtain a list of alerts to view
        let alerts = await model.NPSModel.retrieve(
            this.qb
                .from("alerts")
                .build(),
            this.workerMgr);

        console.log(alerts);

        // Next, get all unique parks from these alerts
        let uniqueParks = [];
        alerts.forEach((elem) => {
            if (!uniqueParks.includes(elem.parkCode)) {
                uniqueParks.push(elem.parkCode);
            }
        });

        //let parks = await this.clientInterface.getParkCodeMap(this.queryBuilder.addAllParkCodes(uniqueParks));

        // Now, link alerts with their respective parks
        //alerts.forEach((elem) => {
        //    elem.linkPark(parks);
        //});

        let tagID = "#slideshowParent";
        //let spinnerID = "#spinner";
        //$(spinnerID).remove();
        for (let i = 0; i < alerts.length; i++) {
            let alert = alerts[i]; //await alerts[i].fetchPark();
            this.renderer.renderToHTML(tagID,
                "alert",
                [alert.url, alert.title/*, alert.park.fullName*/, alert.description]);
        }

        view.ViewUtil.createSlideshow(tagID, 1500, 6000);
    }
}

module.exports = {
    Controller : Controller
};
