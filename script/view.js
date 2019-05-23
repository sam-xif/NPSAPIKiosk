/**
 * Renders parameterized HTML to the DOM. Depends on jQuery.
 * @param template The HTML template with format specifiers.
 * @constructor Creates a new instance from the given template.
 */
function TemplateRenderer() {
    /**
     * Object that maps from template names to templates.
     * New templates can be registered with {@link registerTemplate()}.
     * @type {Object}
     */
    this.templates = {};

    /**
     * Registers a new template for use in rendering.
     * @param templateName The name of the template
     * @param template The template
     */
    this.registerTemplate = function (templateName, template) {
        this.templates[templateName] = template;
    };

    /**
     * Renders, based on the given template, to the tag with the given ID,
     * using the arguments array to format the template.
     * @param {String} tagID The ID of the tag into which to insert HTML.
     * @param {String} templateName The name of the registered template to render.
     * @param {Array} args The array of format arguments.
     */
    this.renderToHTML = function (tagID, templateName, args) {
        if (!(templateName in this.templates)) {
            throw new Error("'templateName' must be in registered templates.");
        }

        let templateCopy = this.templates[templateName];
        // This replaces format specifiers sequentially, which may lead to problems if, for example,
        // {0} expands to {1}, but it shouldn't matter for the purposes of this code.
        args.forEach((elem, idx) => {
            templateCopy = templateCopy.replace(`\{${idx}\}`, elem);
        });
        $(tagID).append(templateCopy);
    };
}

/**
 * Creates a slideshow of divs in the given tag. Depends on jQuery.
 * @param tagID
 * @param fadeSpeed
 * @param delay
 */
function createSlideshow(tagID, fadeSpeed, delay) {
    // Set up alert slideshow
    function Divs() {
        let divs= $(`${tagID} div`),
            now = divs.filter(':visible') /*.not(':hover')*/,
            next = now.next().length ? now.next() : divs.first(),
            speed = fadeSpeed;

        now.fadeOut(speed);
        next.fadeIn(speed);
    }

    $(function () {
        setInterval(Divs, delay);
    });
}

let ViewUtil = {
    "createSlideshow" : createSlideshow
};
