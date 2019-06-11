const view = require('view');
const client = require('client');
const model = require('model');
const widget = require('widget');
const $ = require('jquery');

/**
 *
 */
class Controller {
    /**
     *
     * @param {NPSAPIWorkerManager} workerMgr
     */
    constructor(workerMgr) {
        this.workerMgr = workerMgr;
    }

    /**
     *
     */
    go() {
        throw new Error("'go()' must be implemented on subclasses of Controller");
    }
}

/**
 *
 */
class SingleViewController extends Controller {
    /**
     *
     * @param workerMgr
     * @param containerId
     * @param queryBuilder
     * @param templatesRoot
     * @param templateName
     */
    constructor(workerMgr, containerId, queryBuilder, templatesRoot, templateName) {
        super(workerMgr);
        this.containerId = containerId;
        this.qb = queryBuilder;
        this.templatesRoot = templatesRoot;
        this.templateName = templateName;

        this.template = new view.Template(templatesRoot, templateName);

        this.dataSource = new widget.DataSource();
        this.singleViewWidget = new widget.Widget(this.containerId);

        this.singleViewWidget.bind(this.dataSource, this.template);

        this.dataSource.addOnUpdateHandler(snapshot => this.singleViewWidget.update());
    }

    /**
     * 
     */
    fetchData() {
        let fetchMore = true;
        let maxPages = 10;

        for (let i = 0; fetchMore && i < maxPages; i++) {
            model.NPSModel.retrieve(this.qb.build(), this.workerMgr)
                .then(results => {
                    if (results == null) {
                        fetchMore = false;
                        return;
                    }
                    this.before(results);
                    this.dataSource.addAll(results);
                    this.after(results);
                });
            this.qb.nextPage();
        }
    }

    go() {
        this.fetchData();
    }

    // Hooks (to be implemented by subclasses)

    /**
     *
     * @param data
     */
    before(data) {
        return;
    }

    /**
     *
     * @param data
     */
    after(data) {
        return;
    }
}

/**
 *
 */
class IndexController extends SingleViewController {
    /**
     *
     * @param workerMgr
     * @param templatesRoot
     * @param templateName
     */
    constructor(workerMgr, templatesRoot, templateName) {
        let qb = new client.NPSAPIQueryBuilder();
        super(workerMgr,
            '#{{ containerIDs.alerts }}',
            qb.from('alerts').setLimit(5),
            templatesRoot,
            templateName);
    }

    go() {
        view.ViewUtil.createSlideshow(this.containerId, 1500, 6000);
        super.go();
    }

    before(data) {
        let spinnerID = "#spinner";
        $(spinnerID).remove();
    }
}

/**
 *
 */
class SearchController extends SingleViewController {
    /**
     *
     * @param workerMgr
     * @param templatesRoot
     * @param templateName
     * @param resource
     * @param queryString
     */
    constructor(workerMgr, templatesRoot, templateName, resource, queryString) {
        let qb = new client.NPSAPIQueryBuilder();
        super(workerMgr,
            '#{{ containerIDs.searchResults }}',
            qb.from(resource).setQueryString(queryString).setLimit(5),
            templatesRoot,
            templateName);
    }

    before(data) {
        let spinnerID = "#spinner";
        $(spinnerID).remove();
    }
}


module.exports = {
    Controller : Controller,
    IndexController : IndexController,
    SearchController : SearchController
};
