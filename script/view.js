/**
 * Renders templated HTML to the DOM. Depends on jQuery.
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
     * Renders, based on the given template, to the tag with the given ID,
     * using the arguments array to format the template.
     * @param {String} tagID The ID of the tag into which to insert HTML.
     * @param {Array} args The array of format arguments.
     */
    this.renderToHTML = function (tagID, args) {
        let templateCopy = this.template;
        // This replaces format specifiers sequentially, which may lead to problems if, for example,
        // {0} expands to {1}, but it shouldn't matter for the purposes of this code.
        args.forEach((elem, idx) => {
            templateCopy = templateCopy.replace(`\{${idx}\}`, elem);
        });
        $(tagID).append(templateCopy);
    };
}
