const controller = require('controller');
const worker = require('worker');

/**
 * Entry point and controller logic.
 */

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
    let workerMgr = new worker.NPSAPIWorkerManager('{{ script_dir }}/{{ worker_script }}');

    let controllers = {
        IndexController: new controller.IndexController(workerMgr,
            '{{ views_dir }}',
            '{{ views.alert }}'),
        SearchController: new controller.SearchController(workerMgr,
            '{{ views_dir }}',
            '{{ views.searchResult }}',
            getUrlParameter('resource'),
            getUrlParameter('query'))
    };

    // CONTROLLER is a constant that is expected to be defined on each HTML page
    if (CONTROLLER) {
        controllers[CONTROLLER].go();
    } else {
        throw new Error("Page must define CONTROLLER constant");
    }
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
