var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');
module.exports = function (app) 
{
    app.engine('hbs', exphbs({
        layoutsDir: 'views/_layouts',
        defaultLayout: false,
        helpers: {
            format: val => {
              return numeral(val).format('0,0');
            },
            section: hbs_sections()
          }
        }));
    app.set('view engine', 'hbs');
}