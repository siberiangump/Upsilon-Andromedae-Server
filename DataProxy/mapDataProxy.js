
var mongoose;
var Map;		


exports.initProxy=function(mong){
	
	mongoose=mong;
	
	var mapSchema = mongoose.Schema({
            name: {type:String,default:""},
			update: {type:Date,default:0},
			body: {type:String,default:""}
		});

	mapSchema.methods.changeEvent = function (e,handler) {
			for(var prop in e){
				if(prop!="_id"){
					if(this._doc.hasOwnProperty(prop)){
						this[prop] = e[prop];
					}
				}
			}
			this.save();
	}
	
	mapSchema.methods.cleanEventData = function () {
			var e={};
			for(var prop in this._doc){
				e[prop] = this.prop;
			}
			return e;
	}
	
	Map = mongoose.model('map', mapSchema);
	console.log('map model added');

}

exports.changeEvent=function(e,handler){
	if(e._id==undefined)e._id="";
	Map.findById(e._id, function (err, event){
		if(!event){
			event= new Map({name:e.name});
		}
		event.changeEvent(e)
		console.log('from changeEvent',err);
		handler(event);
	})
}

exports.create=function(e){
	var event = new Map({name:e.name});
	event.save().exec();
	//handler(event);
}

exports.findEvent=function(id,handler){
	Map.findById(id, 
			function (err, u) {
				var value = false;
				if(u!=undefined){
					value = u;
				}
				handler(value);			
			})
}

exports.findEventByFields=function(query,handler){
	Map.find(query, 
		function (err, u) {
			if(err)handler(false);
			handler(u);			
		}
	)
}

exports.findEvents=function(handler){
	Map.find({}, 
		function (err, u) {
		handler(u);
	})
}

exports.removeEvent=function(id,handler){
	Map.remove({_id:id}, 
		function (err, u) {
			if(!err){
				handler(u._id);	
			}
		}
	).remove().exec();
}

exports.removeEvents=function(handler){
	var id_array = [];
	Map.find({}, 
		function (err, u) {
		if(!err){
			for(var e in u){
				id_array.push(u[e]._id);
			}
		}
		handler(id_array);
	}).remove().exec();
}