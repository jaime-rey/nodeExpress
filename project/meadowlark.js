/**
 * Created by Jaime on 29/01/2017.
 */
var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

var handlebars = require('express-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next)  {
   res.locals.showTests = app.get('env') !== 'production' &&
           req.query.test === '1';
   next();
});

app.get('/', function(req, res) {
    res.render('home', { fortune: fortune.getFortune() } );
});
app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    } );
});
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});
app.get('/greeting', function(req, res){
    res.render('about', {
        message: 'welcome',
        style: req.query.style
    });
});
// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404).render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});
var tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

app.get('/api/tours', function(req, res){
    res.json(tours);
});