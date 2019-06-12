var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
module.exports = function (app) 
{
    app.engine('hbs', exphbs({
        layoutsDir: 'views/_layouts',
        defaultLayout: false,
        section: hbs_sections()
        }));
    app.set('view engine', 'hbs');
}