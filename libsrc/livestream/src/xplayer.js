String.prototype.format = function() {
	var a = this,
		b;
	for(b in arguments) {
		a = a.replace(/%[a-z]/, arguments[b]);
	}
	return a;
};

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function XPlayer(id) {
	this.ready = false;
	this.firstFrame = false;
	this.frames = [];
	this.lastFrameTime = 0;
	this.renderCount = 0;
	this.duration = 0;
	this.currentTime = 0;
	this.id = id;
}

XPlayer.prototype.init = function(canvas) {
	var self = this;
	this.status = "init";
	this.display = new H264bsdCanvas(canvas);
	this.decoder = new Worker('resource/js/livestream.min.js?20170418');

	var isWebGl = (this.display.isWebGL() != undefined);
	this.decoder.postMessage({
		'type': 'setWebGlMode',
		'data': isWebGl
	});

	this.decoder.addEventListener('error', function(e) {
		console.log('Decoder error', e);
	})

	this.decoder.addEventListener('message', function(e) {
		var message = e.data;
		if(!message.hasOwnProperty('type')) return;

		switch(message.type) {
			case 'pictureParams':
				croppingParams = message.croppingParams;

				if(croppingParams === null) {
					canvas.width = message.width;
					canvas.height = message.height;
				} else {
					canvas.width = croppingParams.width;
					canvas.height = croppingParams.height;
				}
				if(self.listener) {
					self.listener(102, self.id, "video ready");
				}
				break;
			case 'noInput':
				break;
			case 'pictureReady':
				if(self.listener && !self.firstFrame) {
					self.firstFrame = true;
					self.listener(103, self.id, "first frame");
				}
				self.width = message.width;
				self.height = message.height;
				self.croppingParams = message.croppingParams;
				self.frames.push(new Uint8Array(message.data));
				while(self.frames.length > 5) {
					console.log('Shift frames');
					var buffer = self.frames.shift();
					buffer = null;
				}
				break;
			case 'decoderReady':
				//console.log('Decoder ready');
				//self.status = "decoderReady";
				self.ready = true;
				if(self.listener) {
					self.listener(100, self.id, "Decoder ready");
				}
				break;
			case 'decoderClosed':
				//console.log('Decoder Closed');
				self.frames = [];
				self.display.clearCanvas();
				if(self.listener) {
					self.listener(105, self.id, "Decoder Closed");
				}
				break;
		}
	});
	return this.decoder.playerid;
}

XPlayer.prototype.setSourceUrl = function(url) {
	this.sourceUrl = url;
	var parse_url = /\/\/([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?$/;
	var result = parse_url.exec(url);
	if(result && result.length > 0) {
		this.host = result[1];
		this.port = result[2];
		this.stream = result[3];
	}
	if(url.indexOf(".mp4") != -1) {
		this.wsuri = "ws://%s:%s/dvr".format(this.host, this.port);
	} else {
		this.wsuri = "ws://%s:%s/live".format(this.host, this.port);
	}
}
XPlayer.prototype.setStatusListener = function(f) {
	this.listener = f;
}
XPlayer.prototype.play = function() {
	if(!this.ready) {
		console.log("decoder is not ready");
		return;
	}
	if(this.host && this.port && this.sock == null) {
		var self = this;
		this.sock = new WebSocket(this.wsuri);
		this.sock.binaryType = "arraybuffer";
		this.sock.onopen = function() {
			this.playerid = self.decoder.playerid;
			if(self.listener) {
				self.listener(101, self.id, "socket opened");
			}
			var stream = "%s/%s".format(self.host, self.stream);
			self.sock.send(JSON.stringify({
				cmd: "play",
				stream: self.stream,
				starttime: self.currentTime
			}));
			self.firstFrame = false;
			self.status = "videoPlaying";
			requestAnimFrame(function() {
				self.renderNextFrame(self)
			});
		}

		this.sock.onclose = function(e) {
			console.log(self.id + " connection closed (" + e.code + ")");
			if(self.listener) {
				self.listener(104, self.id, "socket closed");
			}
		}

		this.sock.onmessage = function(e) {
			if(typeof e.data === "string") {
				var message = JSON.parse(e.data);
				if(message.type == "status") {
					//console.log("cmd status " + message.status);
				} else if(message.type == "duration") {
					self.duration = message.duration;
				} else if(message.type == "timestamp") {
					self.currentTime = message.time;
				}
			} else if(e.data.byteLength > 0) {
				var copy = new Uint8Array(e.data);
				if(copy[0] == 0 || copy[1] == 0 || copy[2] == 0 || copy[3] == 1) {
					self.decoder.postMessage({
						'type': 'queueInput',
						'data': copy.buffer
					}, [copy.buffer]);
				}
			}
		}
		return true;
	}
	return false;
}

XPlayer.prototype.getCachedLength = function() {
	return this.frames.length;
}

XPlayer.prototype.getDuration = function() {
	return this.duration;
}

XPlayer.prototype.getCurrentTime = function() {
	return this.currentTime;
}

XPlayer.prototype.getRenderCount = function() {
	var c = this.renderCount;
	this.renderCount = 0;
	return c;
}

XPlayer.prototype.renderNextFrame = function(x) {
	var self = x;
	if(self.status = "videoPlaying") {
		if(self.frames.length > 0) {
			var now = Date.now();
			var dur = now - self.lastFrameTime;
			if(dur > 25 || self.frames.length > 30) {
				var buffer = self.frames.shift();
				self.renderCount++;
				self.display.drawNextOutputPicture(
					self.width,
					self.height,
					self.croppingParams,
					buffer);
			}
		}
		requestAnimFrame(function() {
			self.renderNextFrame(self)
		});
	}
}

XPlayer.prototype.seek = function(timestamp) {
	if(this.sock) {
		console.log("seek to " + timestamp);
		this.sock.send(JSON.stringify({
			cmd: "seek",
			stream: this.stream,
			timestamp: timestamp
		}));
	}
}

XPlayer.prototype.pause = function() {
	if(this.sock) {
		console.log("pause stream " + this.stream);
		this.sock.send(JSON.stringify({
			cmd: "pause",
			stream: this.stream
		}));
	}
}

XPlayer.prototype.resume = function() {
	if(this.sock) {
		console.log("resume stream " + this.stream);
		this.sock.send(JSON.stringify({
			cmd: "resume",
			stream: this.stream
		}));
	}
}

XPlayer.prototype.stop = function() {
	this.status = "videoStop";
	if(this.sock) {
		if(this.sock.readyState == 1) {
			var stream = "%s/%s".format(this.host, this.stream);
			console.log("stop stream " + stream);
			this.sock.send(JSON.stringify({
				cmd: "stop",
				stream: stream
			}));
		}
		this.sock.close();
		this.sock = null;
		this.decoder.postMessage({
			'type': 'close'
		});
	}
}