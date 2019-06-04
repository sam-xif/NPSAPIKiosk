const controller = require('controller');

/**
 * Entry point and controller logic.
 */

const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

/* from https://davidwalsh.name/query-string-javascript */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * Function that gets called when the page is loaded.
 */
function onPageLoad() {
    let ctrl = new controller.Controller(API_ENDPOINT, API_KEY);
    ctrl.initializeView();
    ctrl.renderAlerts();

    console.log(getUrlParameter('query'));
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
