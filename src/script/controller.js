const view = require('view');
const client = require('client');
const model = require('model');
const worker = require('worker');
const $ = require('jquery');

class Controller {
    constructor() {}

    go() {
        throw new Error("'go()' must be implemented on subclasses of Controller");
    }
}

// TODO: Abstract these controller classes

class IndexController extends Controller {
    /**
     * Main controller object for rendering index.html
     * @param api_endpoint
     * @param api_key
     * @constructor
     */
    constructor(api_endpoint, api_key) {
        super();
        this.renderer = new view.TemplateRenderer('{{ views_dir }}');
        this.qb = new client.NPSAPIQueryBuilder();
    }

    go() {
        this.workerMgr = new worker.NPSAPIWorkerManager('{{ script_dir }}/{{ worker_script }}');

        this.initializeView();
        this.renderAlerts();
    }

    initializeView() {
        this.renderer.registerTemplate("alert", '{{ views.alert }}');
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

                    this.renderer.renderToHTML(tagID,
                        "alert",
                        {
                            alerts: alerts.map(alert => {
                                return {
                                    url: alert.url,
                                    title: alert.title,
                                    description: alert.description
                                }
                            })
                        });
                });
            this.qb.nextPage();
        }
    }
}

/**
 * Controller that obtains and renders search results.
 */
class SearchController extends Controller {
    /**
     * @param resource
     * @param queryString
     * @param api_endpoint
     * @param api_key
     * @constructor
     */
    constructor(resource, queryString, api_endpoint, api_key) {
        super();
        this.resource = resource;
        this.queryString = queryString;
        this.renderer = new view.TemplateRenderer('{{ views_dir }}');
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

                    this.renderer.renderToHTML(tagID,
                        "searchResult",
                        {
                            results: results.map(result => {
                                return {
                                    url: result.getUrl(),
                                    title: result.getTitle(),
                                    description: result.getDescription()
                                }
                            })
                        });
                });
            this.qb.nextPage();
        }
    }

    initialize() {
        this.renderer.registerTemplate("searchResult", '{{ views.searchResult }}')
    }

    go() {
        this.initialize();
        this.showResults();
    }
}


module.exports = {
    Controller : Controller,
    IndexController : IndexController,
    SearchController : SearchController
};
