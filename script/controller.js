

function onPageLoad() {
    (async function () {
        let client = new NPSAPIClient();
        let clientInterface = new NPSAPIClientInterface(client);

        // First, get alerts
        let alerts = await clientInterface.getAllAlerts();
        let alertTemplate = "<div>" +
            "<h4><a href=\"{0}\">{1}</a></h4><p>{2}</p></div>";
        let renderer = new TemplateRenderer(alertTemplate);
        let alert0 = await alerts[0].fetchPark();
        let alert1 = await alerts[1].fetchPark();
        renderer.renderToHTML("#slideshow-parent", [alert0.url, alert0.park.fullName, alert0.description]);
        renderer.renderToHTML("#slideshow-parent", [alert1.url, alert1.park.fullName, alert1.description]);

        // Set up alert slideshow
        function Divs() {
            let divs= $('#slideshow-parent div'),
                now = divs.filter(':visible').not(':hover'),
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
