const $ = require('jquery');
const nunjucks = require('nunjucks');

/**
 * A template that is capable of rendering data fragments with different strategies.
 */
class Template {
    /**
     * <p>
     *     Creates a new template instance, searching for the template to use with the given <code>templatename</code>
     *     in the given <code>templatesRoot</code>.
     * </p>
     * @param templatesRoot The directory to search for templates
     * @param templateName The name of the template file to use
     */
    constructor(templatesRoot, templateName) {
        this.templatesRoot = templatesRoot;
        this.templateName = templateName;
        nunjucks.configure(templatesRoot, { autoescape: true });
    }

    // TODO: Consider implementing strategy pattern for these different render methods

    /**
     * <p>
     *     Renders this template with the given context into the DOM element with the given ID. This method appends
     *     the data as the last child of the container element.
     * </p>
     * @param {String} containerId The ID of the DOM element into which to render
     * @param {Object} context The context with which to render
     */
    render(containerId, context) {
        $(containerId).append(nunjucks.render(this.templateName, context));
    }

    /**
     *
     * zero-indexed
     * @param index
     * @param containerId
     * @param context
     */
    renderInsertAfter(index, containerId, context) {
        $(containerId + ` > *:nth-child(${index + 1})`).after(nunjucks.render(this.templateName, context));
    }

    /**
     *
     * @param containerId
     * @param context
     */
    renderPrepend(containerId, context) {
        $(containerId).prepend(nunjucks.render(this.templateName, context));
    }
}

/**
 * <p>
 *     Renders templated HTML to the DOM. Allows use of multiple templates, referenced by names given to the
 *     registerTemplate function.
 * </p>
 */
class TemplateRenderer {
    /**
     * @param templatesRoot
     */
    constructor(templatesRoot) {
        this.templates = {};
        this.templatesRoot = templatesRoot;
    }

    /**
     * Binds the given template file to the given name.
     * @param {String} name The name to assign to the template
     * @param {String} file The file name, relative to the template root folder.
     */
    registerTemplate(name, file) {
        this.templates[name] = new Template(this.templatesRoot, file);
    }

    /**
     *
     * @param containerID
     * @param templateName
     * @param context
     * @throws {Error} if ...
     */
    renderToHTML(containerID, templateName, context) {
        if (!(templateName in this.templates)) {
            throw new Error("'templateName' must be in registered templates.");
        }

        this.templates[templateName].render(containerID, context);
    }
}

/**
 *
 */
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

    /**
     *
     * @param tagID
     * @param index
     */
    static removeNthChild(tagID, index) {
        $(tagID + ` > *:nth-child(${index + 1})`).remove();
    }
}

module.exports = {
    Template : Template,
    TemplateRenderer : TemplateRenderer,
    ViewUtil : ViewUtil
};
