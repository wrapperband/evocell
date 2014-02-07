define(function() {

	var ResLoader = function() {
		this.queue = {};
		this.types = {};
		this.objs = {};
	};

	ResLoader.prototype.load = function(id, url, type) {
		this.queue[id] = url;
		this.types[id] = type;
		var o = {};
		this.objs[id] = o;
		return o;
	}

	ResLoader.prototype.start = function(cb) {
		var item;
		var data = {};
		var loaderCtx = this;
		var itemsToLoad = Object.keys(this.queue).length;
		var loadedCount = 0;

		//alert(Object.keys(this.queue));

		for (var key in this.queue) {
			var type = this.types[key] || "arraybuffer";
			getFromURL(this.queue[key], type, function(key) {
				return function(result) {
					data[key] = result;
					loadedCount++;
					loaderCtx.objs[key].value = result;

					if (loadedCount == itemsToLoad) {
						cb(data);
					}
				}
			}(key));
		}
	}
	
	function getArrayBufferFromURL(url, cb) {
		getFromURL(url, "arraybuffer", cb);
	}

	function getFromURL(url, responseType, cb) {
		var r = new XMLHttpRequest();
		r.open("GET", url, true);  
		// "arraybuffer", "blob", "document", "json", and "text".
		r.responseType = responseType;
		r.onload = function() {   // XHR2
			if (cb) cb(r.response); // XHR2
		}      
		r.send();            
	}

	return {
		getArrayBufferFromURL : getArrayBufferFromURL, 
		ResLoader : ResLoader
	};



});