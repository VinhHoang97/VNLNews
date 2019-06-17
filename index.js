var express = require('express');
var body_parser = require('body-parser');
var express_handlebars = require('express-handlebars');
var path = require('path');
var morgan = require('morgan');

var app = express();
var productRoutes = require('./routes/product_routes');
var categoriesRoutes = require('./routes/categories_routes');
var admin = require('./routes/admin/admin_categories_routes');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
app.use(require('./middlewares/auth_locals_mdw'));
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.engine('hbs', express_handlebars({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));
app.use(require('./utils/global_var'));


app.get('/', (req, res) => {
        res.render('index'); 
})
app.use('/products',productRoutes);
app.use('/category',categoriesRoutes);

app.get('/login',(req,res)=> {
    res.render('login')
})
app.get('/dang_ki',(req,res)=> {
    res.render('dang_ki')
})
app.get('/lay_mk',(req,res)=> {
    res.render('lay_mk')
})

app.get('/doc_gia',(req,res)=> {
    res.render('doc_gia')
})

app.use('/admin',admin);



app.listen(3000, () => {
    console.log('Site running on port 3000');
});