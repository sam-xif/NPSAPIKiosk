const view = require('view');
const client = require('client');
const model = require('model');
const worker = require('worker');
const $ = require('jquery');

/**
 *
 * @param api_endpoint
 * @param api_key
 * @constructor
 */
function Controller(api_endpoint, api_key) {
    this.renderer = new view.TemplateRenderer();
    this.qb = new client.NPSAPIQueryBuilder();
    this.workerMgr = new worker.NPSAPIWorkerManager('script/worker.js');

    //this.client = new client.NPSAPIClient(api_key, api_endpoint);

    this.initializeView = function() {
        this.renderer.registerTemplate("alert",
            '<div class="alert"><h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>');
    };

    this.renderAlerts = function() {
        this.qb.from("alerts").setLimit(5);

        let tagID = "#slideshowParent";
        let slideShowCreated = false;

        // gets 5 * 10 = 50 (ish, because of off-by-one errors from the API) alerts
        for (let i = 0; i < 10; i++) {
            model.NPSModel.retrieve(this.qb.build(), this.workerMgr)
                .then((alerts) => {
                    console.log("adding more alerts");
                    if (!slideShowCreated) {
                        let spinnerID = "#spinner";
                        $(spinnerID).remove();
                        view.ViewUtil.createSlideshow(tagID, 1500, 6000);
                        slideShowCreated = true;
                    }
                    for (let i = 0; i < alerts.length; i++) {
                        let alert = alerts[i]; //await alerts[i].fetchPark();
                        this.renderer.renderToHTML(tagID,
                            "alert",
                            [alert.url, alert.title/*, alert.park.fullName*/, alert.description]);
                    }
                });
            this.qb.nextPage();
        }
    }
}

function SearchController(formID) {
    this.formID = formID;

    $(formID).addEventListener('onsubmit', (data) => {
        console.log(data);
    })
}

module.exports = {
    Controller : Controller
};
