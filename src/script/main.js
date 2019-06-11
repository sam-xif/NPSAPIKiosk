const controller = require('controller');
const client = require('client');
const view = require('view');
const worker = require('worker');
const widget = require('./widget');

/**
 * Entry point and controller logic.
 */

const API_KEY = "{{ api_key }}";
const API_ENDPOINT = "{{ api_endpoint }}";

/* from https://davidwalsh.name/query-string-javascript */
/**
 * Gets a value of a URL parameter.
 * @param name The name of the parameter to get the value of.
 * @return {String | undefined}
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Function that gets called when the page is loaded.
 */
function onPageLoad() {
    // TODO: Write unit tests that assert these types of method side effects work as intended
    let workerMgr = new worker.NPSAPIWorkerManager('{{ script_dir }}/{{ worker_script }}');
    let w = new widget.Widget("searchResults", workerMgr, {});
    let dsource = new widget.DataSource();
    w.bind(dsource, new view.Template('{{ views_dir }}', '{{ views.searchResult }}'));
    dsource.add({ text : 'test'});
    console.log(dsource);
    console.log(w.dataSource);

    // TODO: Perhaps add logic to each page that decides what controller to use to avoid doing it here
    if (getUrlParameter('query') && getUrlParameter('resource')) {
        let ctrl = new controller.SearchController(getUrlParameter('resource'),
            getUrlParameter('query'),
            API_ENDPOINT,
            API_KEY);
        ctrl.go();
    } else {
        let ctrl = new controller.NewIndexController(API_ENDPOINT, API_KEY);
        ctrl.go();
    }
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
