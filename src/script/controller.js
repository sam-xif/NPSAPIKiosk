const view = require('view');
const client = require('client');
const model = require('model');
const worker = require('worker');
const $ = require('jquery');

class Controller {
    /**
     * Main controller object for rendering index.html
     * @param api_endpoint
     * @param api_key
     * @constructor
     */
    constructor(api_endpoint, api_key) {
        this.renderer = new view.TemplateRenderer();
        this.qb = new client.NPSAPIQueryBuilder();
        this.workerMgr = new worker.NPSAPIWorkerManager('{{ script_dir }}/{{ worker_script }}');

        //this.client = new client.NPSAPIClient(api_key, api_endpoint);

    }

    initializeView() {
        this.renderer.registerTemplate("alert",
            '<div class="alert"><h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>');
    }

    renderAlerts() {
        this.qb.from("alerts").setLimit(5);

        let tagID = "#{{ containerIDs.alerts }}";
        let slideShowCreated = false;

        // gets 5 * 10 = 50 (ish, because of off-by-one errors from the API) alerts
        for (let i = 0; i < 10; i++) {
            model.NPSModel.retrieve(this.qb.build(), this.workerMgr)
                .then(alerts => {
                    if (!slideShowCreated) {
                        let spinnerID = "#spinner";
                        $(spinnerID).remove();
                        view.ViewUtil.createSlideshow(tagID, 1500, 6000);
                        slideShowCreated = true;
                    }
                    for (let j = 0; j < alerts.length; j++) {
                        let alert = alerts[j]; //await alerts[i].fetchPark();
                        this.renderer.renderToHTML(tagID,
                            "alert",
                            [alert.url, alert.title/*, alert.park.fullName*/, alert.description]);
                    }
                });
            this.qb.nextPage();
        }
    }
}

class SearchController {
    /**
     * Controller that obtains and renders search results.
     * @param resource
     * @param queryString
     * @param api_endpoint
     * @param api_key
     * @constructor
     */
    constructor(resource, queryString, api_endpoint, api_key) {
        this.resource = resource;
        this.queryString = queryString;
        this.renderer = new view.TemplateRenderer();
        this.qb = new client.NPSAPIQueryBuilder();
        this.workerMgr = new worker.NPSAPIWorkerManager('{{ script_dir }}/{{ worker_script }}');
    }

    showResults() {
        let tagID = "#{{ containerIDs.searchResults }}";

        this.qb
            .from(this.resource)
            .setLimit(5)
            .setQueryString(this.queryString);

        let spinnerRemoved = false;

        // gets 5 * 10 = 50 (ish, because of off-by-one errors from the API) alerts
        for (let i = 0; i < 10; i++) {
            model.NPSModel.retrieve(this.qb.build(), this.workerMgr)
                .then(results => {
                    if (!spinnerRemoved) {
                        let spinnerID = "#spinner";
                        $(spinnerID).remove();
                        spinnerRemoved = false;
                    }

                    for (let j = 0; j < results.length; j++) {
                        let result = results[j];
                        this.renderer.renderToHTML(tagID,
                            "searchResults",
                            []);
                    }
                });
            this.qb.nextPage();
        }
    }

    initialize() {

    }
}


module.exports = {
    Controller : Controller
};
