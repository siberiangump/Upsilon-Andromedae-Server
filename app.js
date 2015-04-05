
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));

dataConnector=require("./DataProxy/dataProxyConnector.js");
dataConnector.init();

//GLOBAL.config = require(__dirname+'/config.js');
//GLOBAL.config.folder.main = __dirname;
/////
/////redirects
/////

app.get('/', function(request, response) {
	console.log("asd");
	response.send('server-on');	
});

//
var mapDataService = require("./Services/mapDataService.js")
//TODO разделить get/post...
app.all('/map_data/:funname',function(request,response) {
	console.log('map_data request')
	mapDataService.runService(request,response)
})
//


app.listen(process.env.PORT || 8888);
