var express =  require('express');
var bodyParser = require('body-parser');
var cors= require('cors');


var customerdata =  require('./model/customerdata');
var routes = require("./routing/controller");

var app= express();
app.use(bodyParser.json()); 
app.use(cors({origin: 'http://localhost:4200' }));
app.use('/customers',routes);


app.listen(8080,function(req,resp){
    console.log("server running");
})