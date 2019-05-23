/**
 * Entry point and controller logic.
 */

/**
 * Function that gets called when the page is loaded
 */
function onPageLoad() {
    (async function () {
        let client = new NPSAPIClient();
        let clientInterface = new NPSAPIClientInterface(client);

        // Get parks
        console.log("Getting park code map");
        let parkCodeMap = await clientInterface.getParkCodeMap();

        // First, get alerts
        let alerts = await clientInterface.getAllAlerts(parkCodeMap);
        console.log(alerts);
        let alertTemplate = "<div>" +
            "<h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>";
        let renderer = new TemplateRenderer(alertTemplate);

        for (let i = 0; i < alerts.length; i++) {
            let alert = alerts[i]; //await alerts[i].fetchPark();
            renderer.renderToHTML("#slideshow-parent", [alert.url, alert.title, alert.description]);
        }

        // Set up alert slideshow
        function Divs() {
            let divs= $('#slideshow-parent div'),
                now = divs.filter(':visible') /*.not(':hover')*/,
                next = now.next().length ? now.next() : divs.first(),
                speed = 1500;

            now.fadeOut(speed);
            next.fadeIn(speed);
        }

        $(function () {
            setInterval(Divs, 5000);
        });

    })();
}
