
var toto = {};
var InfoPage = function(){
	Page.call(this, "");
	
	this.playerPreview = document.createElement("div");
	this.playerPreview.className = "player-preview";
	this.append(this.playerPreview);

	this.playerName = document.createElement("div");
	this.playerName.className = "player-name";
	this.playerName.innerHTML = "nom";
	this.append(this.playerName);
	
	this.playerTitle = document.createElement("div");
	this.playerTitle.className = "player-title";
	this.playerTitle.innerHTML = "title";
	this.append(this.playerTitle);
	
	this.playerProgress = document.createElement("div");
	this.playerProgress.className = "player-progress";
	this.playerProgress.innerHTML = '<div class="player-progress-indic"></div>';
	this.append(this.playerProgress);
	
	this.attributeContainer = document.createElement("dl");
	this.append(this.attributeContainer);
};
InfoPage.prototype = new Page();

InfoPage.prototype.refreshData = function(playerData){
	
};
InfoPage.prototype.addAttribute = function(id, label){
	
};

 