

function TemplateRenderer(template) {
    /**
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