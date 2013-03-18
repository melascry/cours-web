var IMG_PATH= "/cours-web-static/img/"
var infosPage;

	function start()
{
	console.log("Starting Creation");
	
	//var win = new Window('main-window', document.getElementById("gui"));
	var win = new Window('main-window', document.getElementById("gui"));
	
	infosPage = new InfoPage();
	win.addPage("infos",infosPage);
	win.addPage("description", new Page("<strong>Testttttttttttt<br/>ttttttttttttttt</strong>"));
	win.addPage("equipement", new Page("blablabla"));
	
	infoPage.refreshData({
		name: "Johnny",
		title: "be good",
		xp: 200,
		hp: 643,
		power: 65,
		progress: 0.8
	});
	
	console.log("Ending Creation");
}