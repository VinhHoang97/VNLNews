var express = require('express');
var body_parser = require('body-parser');
var express_handlebars = require('express-handlebars');
var path = require('path');
var morgan = require('morgan');
var app = express();
var productRoutes = require('./routes/product_routes');
var categoriesRoutes = require('./routes/categories_routes');
var indexRoutes = require('./routes/index_routes');
var searchRoutes = require('./routes/search_routes');
var productModel= require('./models/product_model');
var admin = require('./routes/admin/admin_categories_routes');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/upload')(app);


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.engine('hbs', express_handlebars({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}));
app.use(require('./middlewares/locals.mdw'));


app.use('/', indexRoutes);
app.use('/products',productRoutes);
app.use('/category',categoriesRoutes);
app.use('/search',searchRoutes);

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


app.use((req,res,next)=>{
    res.render('404');
});

app.use((error,req,res,next)=>{
    res.render('error',{
        message:error.message,
        error
    });
});

app.listen(3000, () => {
    console.log('Site running on port 3000');
});