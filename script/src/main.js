const controller = require('controller');

/**
 * Entry point and controller logic.
 */

const API_KEY = "bGpxFeQ0v8stp7tM6fuxocR57DsjdxrKDuWzrLl9";
const API_ENDPOINT = "https://developer.nps.gov/api/v1/";

/**
 * Function that gets called when the page is loaded.
 */
function onPageLoad() {
    let ctrl = new controller.Controller(API_ENDPOINT, API_KEY);
    ctrl.initializeView();
    ctrl.renderAlerts();
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
