

function onPageLoad() {
    let client = new NPSAPIClient();
    let clientInterface = new NPSAPIClientInterface(client);

    // First, get alerts

}

// Set up alert slideshow
function Divs() {
    let divs= $('#slideshow-parent div'),
        now = divs.filter(':visible').not(':hover'),
        next = now.next().length ? now.next() : divs.first(),
        speed = 1000;

    now.fadeOut(speed);
    next.fadeIn(speed);
}

$(function () {
    setInterval(Divs, 1400);
});