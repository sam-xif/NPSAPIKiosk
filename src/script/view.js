const $ = require('jquery');
const nunjucks = require('nunjucks');

/**
 * Renders templated HTML to the DOM.
 */
class TemplateRenderer {
    /**
     * @constructor
     */
    constructor(templatesPath) {
        this.templates = {};
        nunjucks.configure(templatesPath, { autoescape: true });
    }

    /**
     * Binds the given template file to the given name.
     * @param {String} templateName The name to assign to the template
     * @param {String} file The file name, relative to the template root folder.
     */
    registerTemplate(templateName, file) {
        this.templates[templateName] = file;
    }

    renderToHTML(tagID, templateName, context) {
        if (!(templateName in this.templates)) {
            throw new Error("'templateName' must be in registered templates.");
        }

        let templateCopy = nunjucks.render(this.templates[templateName], context);
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
