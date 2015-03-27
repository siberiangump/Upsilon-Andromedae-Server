
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));

dataConnector=require("./DataProxy/dataProxyConnector.js");
dataConnector.init();

GLOBAL.config = require(__dirname+'/config.js');
GLOBAL.config.folder.main = __dirname;
/////
/////redirects
/////

app.get('/', function(request, response) {
	console.log("asd");
	response.send('server-on');	
});


app.all('/board_front/*',function(request,response) {
	response.sendfile('./'+request.url);
});

app.all('/static/*',function(request,response) {
	response.sendfile('./webapp/'+request.url);
});

app.all('/image/*',function(request,response) {
	response.sendfile('./ /'+request.url);
});


//
var mapDataService = require("./Services/mapDataService.js")
//TODO разделить get/post...
app.all('/rest/map_data/:funname',function(request,response) {
	console.log('map_data request')
	mapDataService.runService(request,response)
})
//


app.listen(process.env.PORT || 8888);
