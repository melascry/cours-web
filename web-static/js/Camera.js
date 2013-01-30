//var Camera = function(scene, player){
//	var _this = this;
//	this.scene = scene;
//	this.player = player;
//	
//	this.x = 0;
//	this.y = 0;
//	
//	this.offsetPlayerX = 300;
//	this.offsetPlayerY = 300;
//	
//	this.boundX = -4096 + 1024;
//	this.boundY = -2037 + 600;
//	
//	this.player.addPositionListener(function(playerX, playerY){		
//		_this.refreshView(playerX, playerY);
//	});
//	
//	this.refreshView = function(playerX, playerY){
//		console.log("test" + playerX + " " + playerY);
//		
//		this.newX  = - (parseInt(playerX) - this.offsetPlayerX);		
//		this.newY = - (parseInt(playerY) - this.offsetPlayerY);
//		
//		if(this.newX > 0) this.newX = 0;
//		if(this.newY > 0) this.newY = 0;
//		if(this.newX < this.boundX) this.newX = this.boundX;
//		if(this.newY < this.boundY) this.newY = this.boundY;
//		
//		//this.scene.animate({left : this.newX, top: this.newY}); 
//		$.ease({x: this.x, y: this.y}, {x: this.newX, y: this.newY}, function(o){
//			_this.scene.css("left", o.x + "px").css("top", o.y + "px");
//			_this.x = o.x;
//			_this.y = o.y;
//		});
//		
//		//this.x = this.newX;
//		//this.y = this.newY;
//	};
//};


var Camera = function(scene, player){
	var _this = this;
	
	this.scene = scene;
	this.player = player;
	
	this.player.addPositionListener(function(playerX, playerY){
		_this.refreshView(playerX, playerY);
	});
	
	this.x = 0;
	this.y = 0;
	
	this.decalX = 512;
	this.decalY = 300;

};
Camera.SCREEN_WIDTH = 1024;
Camera.SCREEN_HEIGHT = 600;
Camera.SCENE_WIDTH = 4096;
Camera.SCENE_HEIGHT = 2037;
Camera.MIN_X = -Camera.SCENE_WIDTH + Camera.SCREEN_WIDTH;
Camera.MAX_X = -Camera.SCREEN_WIDTH;
Camera.MIN_Y = -Camera.SCENE_HEIGHT + Camera.SCREEN_HEIGHT;
Camera.MAX_Y = 0;

Camera.prototype.refreshView = function(playerX, playerY){
	this.x = -playerX + this.decalX;
	this.y = -playerY + this.decalY;
	if(this.x < Camera.MIN_X){
		this.x = Camera.MIN_X;
	}else if(this.x > Camera.MAX_X){
		this.x = Camera.MAX_X;
	}
	if(this.y < Camera.MIN_Y){
		this.y = Camera.MIN_Y;
	}else if(this.y > Camera.MAX_Y){
		this.y = Camera.MAX_Y;
	}
	this.scene.css("top", this.y + "px");
	this.scene.css("left", this.x + "px");
};