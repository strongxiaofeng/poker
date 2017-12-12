function H264bsdCanvas(t,e){this.canvasElement=t,e||this.initContextGL(),this.contextGL&&(this.initProgram(),this.initBuffers(),this.initTextures())}H264bsdCanvas.prototype.isWebGL=function(){return this.contextGL},H264bsdCanvas.prototype.initContextGL=function(){for(var t=this.canvasElement,e=null,r=["webgl","experimental-webgl","moz-webgl","webkit-3d"],a=0;!e&&a<r.length;){var i=r[a];try{e=t.getContext(i)}catch(t){e=null}e&&"function"==typeof e.getParameter||(e=null),++a}this.contextGL=e},H264bsdCanvas.prototype.initProgram=function(){var t=this.contextGL,e=["attribute vec4 vertexPos;","attribute vec4 texturePos;","varying vec2 textureCoord;","void main()","{","gl_Position = vertexPos;","textureCoord = texturePos.xy;","}"].join("\n"),r=["precision highp float;","varying highp vec2 textureCoord;","uniform sampler2D ySampler;","uniform sampler2D uSampler;","uniform sampler2D vSampler;","const mat4 YUV2RGB = mat4","(","1.1643828125, 0, 1.59602734375, -.87078515625,","1.1643828125, -.39176171875, -.81296875, .52959375,","1.1643828125, 2.017234375, 0, -1.081390625,","0, 0, 0, 1",");","void main(void) {","highp float y = texture2D(ySampler,  textureCoord).r;","highp float u = texture2D(uSampler,  textureCoord).r;","highp float v = texture2D(vSampler,  textureCoord).r;","gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;","}"].join("\n"),a=t.createShader(t.VERTEX_SHADER);t.shaderSource(a,e),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)||console.log("Vertex shader failed to compile: "+t.getShaderInfoLog(a));var i=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(i,r),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)||console.log("Fragment shader failed to compile: "+t.getShaderInfoLog(i));var o=t.createProgram();t.attachShader(o,a),t.attachShader(o,i),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)||console.log("Program failed to compile: "+t.getProgramInfoLog(o)),t.useProgram(o),this.shaderProgram=o},H264bsdCanvas.prototype.initBuffers=function(){var t=this.contextGL,e=this.shaderProgram,r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,-1]),t.STATIC_DRAW);var a=t.getAttribLocation(e,"vertexPos");t.enableVertexAttribArray(a),t.vertexAttribPointer(a,2,t.FLOAT,!1,0,0);var i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),t.STATIC_DRAW);var o=t.getAttribLocation(e,"texturePos");t.enableVertexAttribArray(o),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0),this.texturePosBuffer=i},H264bsdCanvas.prototype.initTextures=function(){var t=this.contextGL,e=this.shaderProgram,r=this.initTexture(),a=t.getUniformLocation(e,"ySampler");t.uniform1i(a,0),this.yTextureRef=r;var i=this.initTexture(),o=t.getUniformLocation(e,"uSampler");t.uniform1i(o,1),this.uTextureRef=i;var n=this.initTexture(),u=t.getUniformLocation(e,"vSampler");t.uniform1i(u,2),this.vTextureRef=n},H264bsdCanvas.prototype.initTexture=function(){var t=this.contextGL,e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.bindTexture(t.TEXTURE_2D,null),e},H264bsdCanvas.prototype.drawNextOutputPicture=function(t,e,r,a){var i=this.contextGL;i?this.drawNextOuptutPictureGL(t,e,r,a):this.drawNextOuptutPictureRGBA(t,e,r,a)},H264bsdCanvas.prototype.drawNextOuptutPictureGL=function(t,e,r,a){var i=this.contextGL,o=this.texturePosBuffer,n=this.yTextureRef,u=this.uTextureRef,s=this.vTextureRef;if(null===r)i.viewport(0,0,t,e);else{i.viewport(0,0,r.width,r.height);var T=r.top/e,h=r.left/t,E=r.height/e,x=r.width/t,c=new Float32Array([x,T,h,T,x,E,h,E]);i.bindBuffer(i.ARRAY_BUFFER,o),i.bufferData(i.ARRAY_BUFFER,c,i.DYNAMIC_DRAW)}var l=a,f=t*e,v=l.subarray(0,f);i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,n),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,t,e,0,i.LUMINANCE,i.UNSIGNED_BYTE,v);var R=t/2*e/2,d=l.subarray(f,f+R);i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,u),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,t/2,e/2,0,i.LUMINANCE,i.UNSIGNED_BYTE,d);var m=R,g=l.subarray(f+R,f+R+m);i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,s),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,t/2,e/2,0,i.LUMINANCE,i.UNSIGNED_BYTE,g),i.drawArrays(i.TRIANGLE_STRIP,0,4)},H264bsdCanvas.prototype.drawNextOuptutPictureRGBA=function(t,e,r,a){var i=this.canvasElement,r=null,o=a,n=i.getContext("2d"),u=n.getImageData(0,0,t,e);u.data.set(o),null===r?n.putImageData(u,0,0):n.putImageData(u,-r.left,-r.top,0,0,r.width,r.height)},H264bsdCanvas.prototype.clearCanvas=function(){var t=this.contextGL;if(t)t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);else{var e=this.canvasElement,r=e.getContext("2d");r.clearRect(0,0,e.width,e.height)}};
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
					//console.log('Shift frames');
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
