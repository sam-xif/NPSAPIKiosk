const controller = require('controller');

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
    // TODO: Perhaps add logic to each page that decides what controller to use to avoid doing it here
    if (getUrlParameter('query') && getUrlParameter('resource')) {
        let ctrl = new controller.SearchController(getUrlParameter('resource'),
            getUrlParameter('query'),
            API_ENDPOINT,
            API_KEY);
        ctrl.go();
    } else {
        let ctrl = new controller.IndexController(API_ENDPOINT, API_KEY);
        ctrl.go();
    }
}

document.addEventListener("DOMContentLoaded", onPageLoad, false);
