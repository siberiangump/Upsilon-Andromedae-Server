var mapDataProxy = require('./mapDataProxy.js')

var dataProxys=[
mapDataProxy
]

var mongoose = require('mongoose');
exports.init = function(){
	
	mongoose.connect('mongodb://anton:1234@ds029338.mongolab.com:29338/map-db');
	
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback () {
		console.log('mongoose connect')
		for (var proxy in dataProxys){
			dataProxys[proxy].initProxy(mongoose);
		} 
	});

}