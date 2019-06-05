var express = require('express');
var body_parser = require('body-parser');
var express_handlebars = require('express-handlebars');
var path = require('path');
var router = express.Router();
var app = express();
var categoriesModal = require('./models/categories_model');
var categoriesRoutes = require('./routes/categories_routes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.engine('hbs', express_handlebars({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));
app.get('/', (req, res) => {
    var p = categoriesModal.all().then(rows => {
        console.log(rows)
        res.render('index', {
            category: rows
        });
    }).catch(err => {
        console.log(err);
    })
})

app.use('/category',categoriesRoutes);

app.use('/login',(req,res)=> {
    res.render('login')
})

app.listen(3000, () => {
    console.log('Site running on port 3000');
});