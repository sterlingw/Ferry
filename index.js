var fs = require('fs');
var ReactDOMServer = require('react-dom/server');

module.exports = {
    replaceTemplate: 'ferryTemplate',
    /**
     *
     */
    buildTemplate: function(parentComponentFactory, componentFactory) {
        return ReactDOMServer.renderToString(parentComponentFactory({
            template: componentFactory()
        }));
    },
    /**
     *
     */
    buildHtml: function(htmlPath, template){
        var fileString = fs.readFileSync(htmlPath, {encoding: 'utf8'});
        return fileString.replace(this.replaceTemplate, template);
    },
    /**
     * @return {function} - express middleware function
     */
    route: function(options) {
        var self = this;
       /**
        * Express middleware function
        *
        * @param req - express request object
        * @param res - express response object
        * @param next - express next function
        */
       return function(req, res, next){
            options.routes.forEach(function(route){
                if (route.path == req.path) {
                    var html = self.buildTemplate(options.parentComponentFactory, route.componentFactory);

                    res.send(self.buildHtml(options.htmlPath, html));
                }
            });

            next();
        };
    }
};
