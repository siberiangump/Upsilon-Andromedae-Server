
var mapDataProxy = require('../DataProxy/mapDataProxy.js')

var functionDictionary = {}; 
var functionDictionaryTools = {}; 

function runService(request,response,socket){
	var path =request.params.funname;
	console.log(path);
	functionDictionary[path](request,response);
}

functionDictionary['create']=createEvent;
function createEvent (request,response){
	if(request.body){
		console.log(request.body);
		mapDataProxy.changeEvent(request.body,function(){
			response.send({value:true});
		});
		
	}else response.send({value:false});
}

functionDictionary['returnAll']=returnAll;
function returnAll (request,response){
	if(request.body){
	mapDataProxy.returnAll(response,request.body)
	}else response.send({value:false});
}

functionDictionary['get']=getEvent;
function getEvent (request,response){
	if(request.body){
	mapDataProxy.findEvent(response,request.body,
		function(response,event){
			response.send(event);
		})
	}else response.send({value:false});
}

functionDictionary['getAll']=getAllEvent;
function getAllEvent (request,response){
	if(request.body){
	mapDataProxy.findEvents(
		function(event){
			response.send(event)
		})
	}else response.send({value:false});
}

functionDictionary['change_event']=change;
function change (request,response){
	if(request.body){
		mapDataProxy.changeEvent(request.body.data,
			function(ev){
				var userid="userid";
				response.send({"status":"done","data":ev});
			}
		)
	}
}

functionDictionary['remove_events']=removeEvents;
function removeEvents (request,response){
	mapDataProxy.removeEvents(
		function(idarray){
			response.send({"status":"done"});
		}
	)
}

functionDictionary['remove_event']=removeEvent;
function removeEvent (request,response){
	mapDataProxy.removeEvent(request.body.id,
		function(id){
			response.send({"status":"done"});
		}
	)
}

exports.runService = runService;