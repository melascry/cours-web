var AssetManager = function(){
	this.images = {};
	this.sounds = {};
	this.imagesError = {};
	this.imagesToLoad = {};
	this.soundsToLoad = {};
	this.loadingStarted = false;
};
AssetManager.prototype.loadImage = function(url, id){
	var _this = this;
	if(!id){
		id = url;
	}
	var img = this.images[id];
	if(!img){
		this.imagesToLoad[id] = url;
		img = new Image();
		img.onload = function(){
			delete _this.imagesToLoad[id];
			_this.assetLoaded();
		};
		img.onerror = function(){
			delete _this.imagesToLoad[id];
			_this.imagesError[id] = id;
			_this.assetLoaded();
		};
		img.src = url;
		this.images[id] = img;
	}else{
		this.assetLoaded();
	}
	return img;
};

AssetManager.prototype.loadSound = function(url, id){
	var _this = this;
	if(!id){
		id = url;
	}
	this.soundsToLoad[id] = url;
	var sound = soundManager.createSound({
	id: id,
		url: url,
		autoLoad: true,
		autoPlay: false,
		onload: function() {
			delete _this.soundsToLoad[id];
			_this.assetLoaded();
		},
		volume: 100
	});
	sound.playLoop = function(){
		this.play({			
			onfinish: function() {
				if(!this._play || user.data.soundEnabled){
					this.playLoop();
				}
			}
		});
	};
	this.sounds[id] = sound;
	return this.sounds[id];
};

AssetManager.prototype.assetLoaded = function(){
	this.totalAssetLoaded++;
	this.loadingTime = Date.now() - this.loadingStartTime;
	this.loadingEndTime = Date.now();
	
	if(typeof(this.callback) =='function' && this.isDoneLoading())
		this.callback();
		
};
var k = 0.2;
AssetManager.prototype.renderLoadingProgress = function(g){
	var loadingProgress = this.getLoadingProgress();
	//console.log(loadingProgress);
	
	g.save();
	g.translate(500,500);
	grad = g.createLinearGradient(0,0,500*loadingProgress,0);
	
	k += 1 * g.deltaTime/1000;
	if(k >1)
		k = 0
	var f = 0.55;
	var f2 = (Math.sin(k*Math.PI * 2)/2 + 0.5) * f + (1 - f) / 2;
	
	grad.addColorStop(0,"red")
	grad.addColorStop(f2 - 0.2,"red");
	grad.addColorStop(f2,"white");
	grad.addColorStop(f2 + 0.2,"red");
	grad.addColorStop(1,"red")
	
	g.fillStyle = grad;//"rgba(255,0,0,"+1*loadingProgress+")";
	g.strokeStyle = "rgba(255,255,255,1)";
	
	
	g.fillRect(0,0,500*loadingProgress,100);
	g.strokeRect(0,0,500,100);
	
	g.fillStyle = "white";
	g.font = "22px gunship";
	g.textAlign = "center";
	g.textBaseLine = "middle";
	
	g.fillText("test "+100*loadingProgress+'%', 250,50,250,50);
	
	g.restore();
};

AssetManager.prototype.isDoneLoading = function(){
	return this.totalAssetCount == this.totalAssetLoaded;
};

AssetManager.prototype.startLoading = function(loadingList, soundLoadingList, callback){
	
	this.callback = callback;
	this.loadingStartTime = Date.now();
	
	this.totalAssetLoaded = 0;
	this.totalAssetCount = 0;
	for(var i in loadingList){
		this.totalAssetCount++;
	}
	for(var i in soundLoadingList){
		this.totalAssetCount++;
	}
	this.loadingStarted = true;
	this.isFightLoading = false;
	for(var i in loadingList){
		this.loadImage(loadingList[i], i);
	}
	for(var i in soundLoadingList){
		this.loadSound(soundLoadingList[i], i);
	}
};
AssetManager.prototype.getLoadingProgress = function(){
	if(this.totalAssetCount == 0){
		return 0;
	}else{
		return this.totalAssetLoaded / this.totalAssetCount;
	}
};

AssetManager.prototype.getImage = function(id){
	return this.images[id];
};
AssetManager.prototype.getSound = function(id){
	return this.sounds[id];
};
