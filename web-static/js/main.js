var game;
function start(){
	game = new Game();
}

$(document).ready(function()
{
	soundManager = new SoundManager();
	soundManager.url = "/cours-web/";
	soundManager.setup({url:"/cours-web/"});
	
	soundManager.onready(function()
			{
				game = new Game();
			});
	soundManager.beginDelayedInit();
}		
);