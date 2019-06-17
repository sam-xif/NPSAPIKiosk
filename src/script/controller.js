const view = require('view');
const client = require('client');
const model = require('model');
const widget = require('widget');
const $ = require('jquery'); // TODO: Remove dependency on jQuery for this module

/**
 * Controller interface that defines only the go() method, which executes this controller's logic.
 */
class Controller {
    /**
     * Creates a new Controller instance with the given worker thread manager.
     * @param {NPSAPIWorkerManager} workerMgr The worker manager to use to communicate with the API
     */
    constructor(workerMgr) {
        this.workerMgr = workerMgr;
    }

    /**
     * Executes this controller's logic.
     */
    go() {
        throw new Error("'go()' must be implemented on subclasses of Controller");
    }
}

/**
 * Base class for controllers which render to a single view on a page.
 */
class SingleViewController extends Controller {
    /**
     *
     * @param workerMgr The worker manager to use to communicate with the API.
     * @param containerId The container id to render to
     * @param queryBuilder The query builder to use to execute queries
     * @param templatesRoot The root directory of templates
     * @param templateName The name of the template in <code>templatesRoot</code> to use to render data
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
        //view.ViewUtil.createSlideshow(this.containerId, 1500, 6000);
        //super.go();
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

        // Set default value for dropdown
        $("#nps-search-resource-select").children("option").each((i, itm) => {
            let child = $(itm);
            if (child.attr("value") === resource) {
                child.attr("selected", "selected");
            }
        });
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
