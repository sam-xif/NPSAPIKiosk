const view = require('view');
const client = require('client');
const model = require('model');
const worker = require('worker');
const $ = require('jquery');
const widget = require('./widget');

class Controller {
    /**
     *
     * @param {NPSAPIWorkerManager} workerMgr
     */
    constructor(workerMgr) {
        this.workerMgr = workerMgr;
    }

    go() {
        throw new Error("'go()' must be implemented on subclasses of Controller");
    }
}

class SearchController extends Controller {
    constructor(workerMgr, resource, queryString) {
        super(workerMgr);
        this.qb = new client.NPSAPIQueryBuilder();
        this.containerId = '#{{ containerIDs.searchResults }}';

        this.resource = resource;
        this.queryString = queryString;

        this.template = new view.Template('{{ views_dir }}', '{{ views.searchResult }}');

        this.searchSource = new widget.DataSource();
        this.searchWidget = new widget.Widget(this.containerId, this.workerMgr);

        this.searchWidget.bind(this.searchSource, this.template);

        this.searchSource.addOnUpdateHandler(snapshot => this.searchWidget.update());
    }

    go() {
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

                    this.searchSource.addAll(results);
                });
            this.qb.nextPage();
        }
    }
}


class IndexController extends Controller {
    constructor(workerMgr) {
        super(workerMgr);
        this.qb = new client.NPSAPIQueryBuilder();
        this.containerId = '#{{ containerIDs.alerts }}';

        this.alertsSource = new widget.DataSource();

        this.template = new view.Template('{{ views_dir }}', '{{ views.alert }}');

        this.alertsWidget = new widget.Widget(this.containerId, this.workerMgr);
        this.alertsWidget.bind(this.alertsSource, this.template);

        // Add event handler
        this.alertsSource.addOnUpdateHandler(snapshot => this.alertsWidget.update());
    }

    go() {
        this.qb.from("alerts").setLimit(5);
        let slideshowCreated = false;

        for (let i = 0; i < 10; i++) {
            model.NPSModel.retrieve(this.qb.build(), this.workerMgr)
                .then(results => {
                    if (!slideshowCreated) {
                        let spinnerID = "#spinner";
                        $(spinnerID).remove();
                        view.ViewUtil.createSlideshow(this.containerId, 1500, 6000);
                        slideshowCreated = true;
                    }

                    this.alertsSource.addAll(results);
                });
            this.qb.nextPage();
        }
    }
}


module.exports = {
    Controller : Controller,
    IndexController : IndexController,
    SearchController : SearchController
};
