const controller = require('controller');
const client = require('client');
const view = require('view');
const worker = require('worker');
const widget = require('./widget');

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

    // TODO: Perhaps add logic to each page that decides what controller to use to avoid doing it here
    if (getUrlParameter('query') && getUrlParameter('resource')) {
        let ctrl = new controller.NewSearchController(workerMgr, getUrlParameter('resource'),
            getUrlParameter('query'));
        ctrl.go();
    } else {
        let ctrl = new controller.NewIndexController(workerMgr);
        ctrl.go();
    }
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
