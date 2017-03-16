/* =========== */
/* CONSTRUCTOR */
/* =========== */
var Anims = function() {

};

/* =========== */
/* === INIT ===*/
/* =========== */
Anims.prototype.init = function() {
	console.log("Transitions animations ready");
};


/* =============== */
/* === METHODES ===*/
/* =============== */
Anims.prototype.loader = function(container, obj, svgFile) {
	var _this = this;
	this.loaderAnim = true;

	TweenMax.to(container, 1, {opacity: 1, display: "block", ease: Power1.easeOut});

	new Vivus(obj, {
		duration: 90,
		start: "autostart",
		delay: 50,
		pathTimingFunction: Vivus.EASE_Out,
		file: 'img/'+svgFile
	}, function(loaderVivus) {
		if(loaderVivus.getStatus() === 'end' && _this.loaderAnim) {
			setTimeout(function() {
				loaderVivus.play(-1);
			}, 500);
		} else if(_this.loaderAnim) {
			container.find("svg").remove();
			TweenMax.to(container, .8, {opacity: 0, display: "none", ease: Power1.easeOut});
			_this.loaderAnim = false;
		}
	});
};