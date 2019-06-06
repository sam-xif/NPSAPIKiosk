const $ = require('jquery');

class TemplateRenderer {
    /**
     * Renders parameterized HTML to the DOM. Depends on jQuery.
     * @param template The HTML template with format specifiers.
     * @constructor
     */
    constructor() {
        /**
         * Object that maps from template names to templates.
         * New templates can be registered with {@link registerTemplate()}.
         * @type {Object}
         */
        this.templates = {};

    }

    registerTemplate(templateName, template) {
        this.templates[templateName] = template;
    }

    renderToHTML(tagID, templateName, args) {
        if (!(templateName in this.templates)) {
            throw new Error("'templateName' must be in registered templates.");
        }

        let templateCopy = this.templates[templateName];
        // This replaces format specifiers sequentially, which may lead to problems if, for example,
        // {0} expands to {1}, but it shouldn't matter for the purposes of this code.
        args.forEach((elem, idx) => {
            templateCopy = templateCopy.replace(`\{${idx}\}`, elem);
        });

        // Append new
        $(tagID).append(templateCopy);
    }
}

class ViewUtil {
    // TODO: Perhaps make a slideshow class that is more configurable
    /**
     * Creates a slideshow of divs in the given tag. Depends on jQuery.
     * @param {String} tagID The ID of the tag to create the slideshow in.
     * @param {int} fadeSpeed Fade speed in ms.
     * @param {int} delay Delay between fades in ms.
     */
    static createSlideshow(tagID, fadeSpeed, delay) {
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

    /**
     * Clears the innerHTML of the tag with the given id.
     * @param tagID
     */
    static clearTag(tagID) {
        $(tagID).empty();
    }

}

module.exports = {
    TemplateRenderer : TemplateRenderer,
    ViewUtil : ViewUtil
};
