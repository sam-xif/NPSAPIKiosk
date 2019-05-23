/**
 * Renders templated HTML to the DOM.
 * @param template The HTML template with format specifiers.
 * @constructor Creates a new instance from the given template.
 */
function TemplateRenderer(template) {
    /**
     * The template.
     * @type {String}
     */
    this.template = template;

    /**
     *
     * @param tagID
     * @param args
     */
    this.renderToHTML = function (tagID, args) {
        let templateCopy = this.template;
        args.forEach((elem, idx) => {
            templateCopy = templateCopy.replace(`\{${idx}\}`, elem);
        });
        $(tagID).append(templateCopy);
    };
}