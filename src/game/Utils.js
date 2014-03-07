define(["jquery", "libs/FileSaver"], function($, saveAs) {
	function relMouseCoords(event){
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var canvasX = 0;
		var canvasY = 0;
		var currentElement = this;

		do{
		  totalOffsetX += currentElement.offsetLeft;
		  totalOffsetY += currentElement.offsetTop;
		}
		while(currentElement = currentElement.offsetParent)

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		return {x:canvasX, y:canvasY}
	}
	HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

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

	requestAnimFrame = (function(){
		return  window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback, element){ setTimeout(callback, 1000 / 60); }
	})();

	var AnimationLoop = function(callback) {
		this.callback = callback;
		this.pauseRequested = true;
	};

	AnimationLoop.prototype.start = function() {
		var loopContext = this;
		this.pauseRequested = false;
		var myFn = function() {
			if (!loopContext.pauseRequested) {
				loopContext.callback();
				requestAnimFrame(myFn);
			}
		}
		myFn();
	}

	AnimationLoop.prototype.step = function() {
		this.callback();
	}

	AnimationLoop.prototype.stop = function() {
		this.pauseRequested = true;
	}

	AnimationLoop.prototype.toggle = function() {
		if (this.pauseRequested) {
			this.start();
		}
		else {
			this.stop();
		}
	}

	var FPSMonitor = function(elementID) {
		this.frames = 0;

		var delayMs = 1000;
		var time;
		var monitorContext = this;

		function fr(){
			var ti = new Date().getTime();
			var fps = Math.round(1000*monitorContext.frames/(ti - time));
			document.getElementById(elementID).innerHTML = fps.toString();
			monitorContext.frames = 0;  
			time = ti;
		}
		var timer = setInterval(fr, delayMs);
		time = new Date().getTime();
	};
	FPSMonitor.prototype.frameIncrease = function() {
		this.frames++;
	}

	var Keyboard = {
	  _pressed: {},

	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  
	  isPressed: function(keyCode) {
		 return this._pressed[keyCode];
	  },
	  
	  onKeydown: function(event) {
		 this._pressed[event.keyCode] = true;
	  },
	  
	  onKeyup: function(event) {
		 delete this._pressed[event.keyCode];
	  }
	};
	function setupKeyboard()
	{
		window.addEventListener('keyup', function(event) { Keyboard.onKeyup(event); }, false);
		window.addEventListener('keydown', function(event) { Keyboard.onKeydown(event); }, false);
	}
	setupKeyboard();
	

	return {
		AnimationLoop : AnimationLoop,
		FPSMonitor : FPSMonitor,

		getFromURL: getFromURL,
		saveAs: saveAs,

		keyboard : Keyboard		
	};
});
