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
     * Renders, based on the given template, to the tag with the given ID, using the arguments array to format the
     *  template.
     * @param {String} tagID The ID of the tag into which to insert HTML.
     * @param {Array} args The list of format arguments.
     */
    this.renderToHTML = function (tagID, args) {
        let templateCopy = this.template;
        args.forEach((elem, idx) => {
            templateCopy = templateCopy.replace(`\{${idx}\}`, elem);
        });
        $(tagID).append(templateCopy);
    };
}
