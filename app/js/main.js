$(function(){
	console.log('Ready');

	// Initialisation des transitions photo / dev
	var anims = new Anims();
	anims.init();

	$(".photo").bind("click", function(e) {
		e.preventDefault();
		anims.loader($(".load"), "load-img", "loader_photo.svg");
	});

	$(".dev").bind("click", function(e) {
		e.preventDefault();
		anims.loader($(".load"), "load-img", "loader_photo.svg");
	});

	function degToRad(x) {
		return x / 180 * Math.PI;
	}

	// CALC SKEW CÔTE OPPOSÉ
	function moveContentForSkew() {
		var A = 180 - 90 - 3;
		var sinA = Math.sin(degToRad(A));
		var sinC = Math.sin(degToRad(3));
		var ratio = $(window).innerWidth() / sinA;
		var skewSideSize = ratio * sinC;
		$(".page-content").css("marginTop", "-"+skewSideSize+"px");
		var newHeight = $(window).innerHeight() - (200 - skewSideSize);
		$(".page-content").css("height", newHeight+"px");
	}
	moveContentForSkew();


	// Initialisation du fond du header
	var canvas = new canvasBuild(1, $("nav").innerWidth(), $("nav").innerHeight());
	function initCanvas() {
		canvas.stopAnim();
		canvas.setbgColor(17,17,17);
		canvas.setAgents("rond", 130, 4, .1, 1, true);
		canvas.setAgentFillColor("rgb(36,36,36)");
		canvas.startDelaunay(1, "rgb(36,36,36)");
		canvas.delaunayMaxDistance(1, 70);
		canvas.delaunayStrokeWidth(2);
		canvas.startAnim();
	}
	initCanvas();

	$(window).on("resize", function() {
		canvas.onWindowResize($("nav").innerWidth(), $("nav").innerHeight());
		initCanvas();
		moveContentForSkew();
	});
});