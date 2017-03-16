/*
 * CLASS canvasBuild
 *
 * Côme Gaillard, tous droits réservés @ 2015
 *
 * Starter de design generatif
 * permet la configuration facile d'un canvas et d'agents.
 */


	/* * * * * * * * * * * * * * * * * * *
	 * * * * * CLASS FUNCTIONS * * * * * *
	 * * * * * * * * * * * * * * * * * * */

	var canvasBuild = function(backgroundAlpha, displayWidth, displayHeight, canvasID) {
		this.idAnimFrame;
		this.settings = {};
		this.settings.displaySizeWidth = displayWidth || document.documentElement.clientWidth;
		this.settings.displaySizeHeight = displayHeight || document.documentElement.clientHeight;
		this.settings.delaunay = false;
		this.settings.mouseActivated = false;
		this.settings.showPointAgent = true;
		this.settings.agentFill = "solid";
		this.settings.agentFillColor = "rgb(22, 21, 23)";
		this.settings.agentFillTwo = false;
		this.settings.agentFillTwoColor = "rgb(35, 33, 36)";
		this.settings.agentSizeIn = 0;
		this.settings.agentSizeRandom = false;
		this.settings.agentRandomMinSize = 1;
		this.settings.agentRandomMaxSize = 10;
		this.settings.fadeOut = false;
		this.settings.activeDistanceDelaunay = false;
		this.settings.activeDistanceDelaunayVal = 100;
		this.settings.triangleAlphaMouse = 1;
		this.settings.triangleAlpha = 1;
		this.settings.delaunayStrokeWidth = 1;

		this.settings.backR = 0;
		this.settings.backG = 0;
		this.settings.backB = 0;
		this.settings.backAlpha = backgroundAlpha || 1;

		// Init canvas
		this.canvas = document.getElementById(canvasID) || document.getElementById('agentContainer');
		this.canvas.width = this.settings.displaySizeWidth;
		this.canvas.height = this.settings.displaySizeHeight;
		this.ctx = this.canvas.getContext("2d");

		this.ctx.fillStyle = "rgb(22, 21, 23)";
		this.ctx.fillRect(0, 0, this.settings.displaySizeWidth, this.settings.displaySize);

		this.agentPositions = [];






		// Init text layer
		// var checkAlpha = function checkAlpha(pixels, i) {
		//     return pixels[i * 4 + 3] > 0;
		// };

		// this.settings.text = "Côme Gaillard";
		// this.settings.font = 'bold 50px "Arial"';
		// this.settings.textBaseline = "center";
		// this.settings.textColor = "#fff";
		// this.textSize = this.ctx.measureText(this.settings.text);
		// this.ctx.fillText(
		//     this.settings.text,
		//     Math.round((this.canvas.width / 2) - (this.textSize.width / 2)),
		//     Math.round(this.canvas.height / 2)
		// );
		// this.imageData = this.ctx.getImageData(1, 1, this.canvas.width, this.canvas.height);
		// this.pixels = this.imageData.data;
  //   	this.dataLength = this.imageData.width * this.imageData.height;

  //   	//Loop through all pixels
	 //    for (var i = 0; i < this.dataLength; i++) {
	 //        var currentRow = Math.floor(i / this.imageData.width);
	 //        var currentColumn = i - Math.floor(i / this.imageData.height);

	 //        if (currentRow % 2 || currentColumn % 2) {
	 //            continue;
	 //        }

	 //        //If alpha channel is greater than 0
	 //        if (checkAlpha(this.pixels, i)) {
	 //            var cy = ~~(i / this.imageData.width);
	 //            var cx = ~~(i - (cy * this.imageData.width));

	 //            this.agentPositions.push([cx, cy]);
	 //        }
	 //    }






		var $this = this;
		$(window).resize(function() {
			$this.ctx.width = document.documentElement.clientWidth;
			$this.ctx.height = document.documentElement.clientHeight;
			$this.canvas.width = document.documentElement.clientWidth;
			$this.canvas.height = document.documentElement.clientHeight;
			$this.settings.displaySizeWidth = document.documentElement.clientWidth;
			$this.settings.displaySizeHeight = document.documentElement.clientHeight;
			$this.ctx.fillRect(0, 0, $this.settings.displaySizeWidth, $this.settings.displaySizeHeight);
		});

	}

	canvasBuild.prototype.setAgents = function(forme, nb, size, maxIncr, alpha, showPointAgent) {
		this.settings.nbAgents = nb || 100;
		this.settings.agentSize = size || 250;
		this.settings.maxIncrement = maxIncr || 3;
		this.settings.agentAlpha = alpha || 1;
		this.settings.agentForm = forme || "rond";
		this.settings.showPointAgent = showPointAgent;
		this.settings.agentFillColor = "rgb(255,255,255)";
		this.myAgent = [];
		this.settings.colorOne = true;
		var $this = this;

		var createAgent = function() {
			var agent = {};
			agent.y = Math.random()*$this.settings.displaySizeHeight;
			agent.x = Math.random()*$this.settings.displaySizeWidth;
			agent.yIncrement = (Math.random() * 2 - 1) * $this.settings.maxIncrement;
			agent.saveYIncr = agent.yIncrement;
			agent.xIncrement = (Math.random() * 2 - 1) * $this.settings.maxIncrement;
			agent.saveXIncr = agent.xIncrement;
			if($this.settings.agentSizeRandom) {
				var agentSizeUpdate = Math.round(Math.random()*$this.settings.agentRandomMaxSize) + $this.settings.agentRandomMinSize;
			} else {
				var agentSizeUpdate = $this.settings.agentSize;
			}
			agent.update = function(distanceToMouseSquared) {
				if($this.settings.showPointAgent) {
					// Dessiner le point de l'agent
					$this.ctx.beginPath();
					switch($this.settings.agentForm) {
					    case "rond":
							$this.ctx.arc(agent.x, agent.y, agentSizeUpdate, 0, 2 * Math.PI, false);
					        break;
					    case "carre":
					    	$this.ctx.rect(agent.x, agent.y, agentSizeUpdate, agentSizeUpdate);
					        break;
					    default:
							$this.ctx.arc(agent.x, agent.y, agentSizeUpdate, 0, 2 * Math.PI, false);
					}
					switch($this.settings.agentFill) {
						case "solid":
							if(!$this.settings.agentFillTwo) {
								var color = $this.settings.agentFillColor.slice(0, 3) + "a" + $this.settings.agentFillColor.slice(3);
									color = color.slice(0, -1);
								$this.ctx.fillStyle= color+","+$this.settings.agentAlpha+")";
								$this.ctx.fill();
							} else {
								var colorOne = $this.settings.agentFillColor.slice(0, 3) + "a" + $this.settings.agentFillColor.slice(3);
									colorOne = colorOne.slice(0, -1);
								var colorTwo = $this.settings.agentFillTwoColor.slice(0, 3) + "a" + $this.settings.agentFillTwoColor.slice(3);
									colorTwo = colorTwo.slice(0, -1);
								if($this.settings.colorOne) {
									$this.ctx.fillStyle= colorOne+","+$this.settings.agentAlpha+")";
									$this.ctx.fill();
									$this.settings.colorOne = false;
								} else {
									$this.ctx.fillStyle= colorTwo+","+$this.settings.agentAlpha+")";
									$this.ctx.fill();
									$this.settings.colorOne = true;
								}
							}
							break;
						case "gradient":
							var fillColor = $this.settings.agentFillColor;
							if(!$this.settings.agentSizeRandom) {
								var grd=$this.ctx.createRadialGradient(agent.x,agent.y,$this.settings.agentSizeIn,agent.x,agent.y,agentSizeUpdate);
							} else {
								if($this.settings.agentSizeIn >= agentSizeUpdate) var agentSizeIn = agentSizeUpdate - 1;
								else agentSizeIn = $this.settings.agentSizeIn;
								var grd=$this.ctx.createRadialGradient(agent.x,agent.y,agentSizeIn,agent.x,agent.y,agentSizeUpdate);
							}
							if(!$this.settings.agentFillTwo) {
								var color = $this.settings.agentFillColor.slice(0, 3) + "a" + $this.settings.agentFillColor.slice(3);
									color = color.slice(0, -1);
									grd.addColorStop(1,color+",0)");
									grd.addColorStop(0,color+",1)");
							} else {
								var colorOne = $this.settings.agentFillColor.slice(0, 3) + "a" + $this.settings.agentFillColor.slice(3);
									colorOne = colorOne.slice(0, -1);
								var colorTwo = $this.settings.agentFillTwoColor.slice(0, 3) + "a" + $this.settings.agentFillTwoColor.slice(3);
									colorTwo = colorTwo.slice(0, -1);
								if($this.settings.colorOne) {
									grd.addColorStop(1,colorOne+",0)");
									grd.addColorStop(0,colorOne+","+$this.settings.agentAlpha+")");
									$this.settings.colorOne = false;
								} else {
									grd.addColorStop(1,colorTwo+",0)");
									grd.addColorStop(0,colorTwo+","+$this.settings.agentAlpha+")");
									$this.settings.colorOne = true;
								}
							}
							$this.ctx.fillStyle = grd;
							$this.ctx.fill();
							$this.ctx.lineWidth = 0;
							$this.ctx.strokeStyle = 'rgba(0,0,0,0)';
							$this.ctx.stroke();
							break;
					    default:
							$this.ctx.fillStyle= $this.settings.agentFillColor;
							$this.ctx.fill();
					}
					$this.ctx.closePath();
					// ctx.fillRect(agent.x, agent.y, $this.settings.agentSize, $this.settings.agentSize);
				}

				var mouseOnAgent = distanceToMouseSquared / this.displaySizeSquared;

				if(mouseOnAgent <= $this.settings.distanceActiveMouse && $this.settings.stopAgentOnMouse ) {
					agent.xIncrement = 0;
					agent.yIncrement = 0;
				} else {
					agent.yIncrement = agent.saveYIncr;
					agent.xIncrement = agent.saveXIncr;
				}

				agent.x += agent.xIncrement;
				agent.y += agent.yIncrement;

				if(agent.x >= $this.settings.displaySizeWidth || agent.x <= 0){
					agent.xIncrement = - agent.xIncrement;
					agent.saveXIncr = agent.xIncrement;
				} else if( agent.y >= $this.settings.displaySizeHeight || agent.y <= 0 ) {
					agent.yIncrement = - agent.yIncrement;
					agent.saveYIncr = agent.yIncrement;

				}
			};

			// return the new object
			return agent;
		}

		// Création de l'agent
		for (var i = 0; i < this.settings.nbAgents; i++) {
		    this.myAgent.push(createAgent());
		}
	}

	/* * * * * * * * * * * * * * * * * * *
	 * * * * * ANIMATION CONTROL * * * * *
	 * * * * * * * * * * * * * * * * * * */

	canvasBuild.prototype.startAnim = function(){
		var $this = this;
		this.idAnimFrame = requestAnimationFrame(step);

		function step() {
			if($this.settings.fadeOut) {
				$this.settings.agentAlpha -= .007;
				$this.settings.triangleAlphaMouse -= .007;
				$this.settings.triangleAlpha -= .007;
			}
			// Efface écran
			$this.ctx.fillStyle = "rgba("+$this.settings.backR+", "+$this.settings.backG+", "+$this.settings.backB+", "+$this.settings.backAlpha+")";
			$this.ctx.fillRect(0, 0, $this.settings.displaySizeWidth, $this.settings.displaySizeHeight);

	    $.each($this.agentPositions, function(i, val) {
	    	$this.myAgent[i].y = val[1];
	    	$this.myAgent[i].x = val[0];
	    });

			// Get Delaunay triangles
			if ($this.settings.delaunay && !$this.settings.activeDistanceDelaunay) {
			    var triangles = Delaunay.triangulate($this.myAgent);
			    var triangleColorRGB = $this.settings.triangleColor;
			    triangleColorRGB = triangleColorRGB.replace('rgb(', '');
			    triangleColorRGB = triangleColorRGB.replace(')', '');
			    triangleColorRGB = triangleColorRGB.split(",");
			    var colorR = triangleColorRGB[0];
			    var colorG = triangleColorRGB[1];
			    var colorB = triangleColorRGB[2];

			    // Draw triangles
			    for(i = 0; i < triangles.length; i += 3) {
					if ($this.settings.mouseActivated) {
				        var a1 = $this.myAgent[triangles[i]];
				        var a2 = $this.myAgent[triangles[i + 1]];
				        var a3 = $this.myAgent[triangles[i + 2]];
						if($this.distanceMouseToTriangleCenter(a1, a2, a3) < $this.settings.distanceActiveMouse) {
				    		$this.ctx.strokeStyle = "rgba("+colorR+", "+colorG+", "+colorB+", " +  $this.settings.triangleAlphaMouse + ")";
							$this.ctx.beginPath();
							$this.ctx.moveTo(a1.x, a1.y);
							$this.ctx.lineTo(a2.x, a2.y);
							$this.ctx.lineTo(a3.x, a3.y);
							$this.ctx.lineWidth = $this.settings.delaunayStrokeWidth;
							$this.ctx.closePath();
							$this.ctx.stroke();
						} else {
				    		$this.ctx.strokeStyle = "rgba("+colorR+", "+colorG+", "+colorB+", " +  $this.settings.triangleAlpha + ")";
							$this.ctx.beginPath();
							$this.ctx.moveTo(a1.x, a1.y);
							$this.ctx.lineTo(a2.x, a2.y);
							$this.ctx.lineTo(a3.x, a3.y);
							$this.ctx.lineWidth = $this.settings.delaunayStrokeWidth;
							$this.ctx.closePath();
							$this.ctx.stroke();
						}
					} else {
						if(!$this.settings.activeDistanceDelaunay) {
					        var a1 = $this.myAgent[triangles[i]];
					        var a2 = $this.myAgent[triangles[i + 1]];
					        var a3 = $this.myAgent[triangles[i + 2]];
				    		$this.ctx.strokeStyle = "rgba("+colorR+", "+colorG+", "+colorB+", " +  $this.settings.triangleAlpha + ")";
							$this.ctx.beginPath();
							$this.ctx.moveTo(a1.x, a1.y);
							$this.ctx.lineTo(a2.x, a2.y);
							$this.ctx.lineTo(a3.x, a3.y);
							$this.ctx.lineWidth = $this.settings.delaunayStrokeWidth;
							$this.ctx.closePath();
							$this.ctx.stroke();
						}
					}
			    }
			} else if ($this.settings.delaunay && $this.settings.activeDistanceDelaunay) {
			    var triangleColorRGB = $this.settings.triangleColor;
			    triangleColorRGB = triangleColorRGB.replace('rgb(', '');
			    triangleColorRGB = triangleColorRGB.replace(')', '');
			    triangleColorRGB = triangleColorRGB.split(",");
			    var colorR = triangleColorRGB[0];
			    var colorG = triangleColorRGB[1];
			    var colorB = triangleColorRGB[2];

			    for(i = 0; i < $this.myAgent.length; i += 1) {
			        var a = $this.myAgent[i];
			        for(j = 0; j < $this.myAgent.length; j += 1) {
			        	var b = $this.myAgent[j];
						if($this.distancePointToPoint(a, b) < $this.settings.activeDistanceDelaunayVal) {
				    		$this.ctx.strokeStyle = "rgba("+colorR+", "+colorG+", "+colorB+", " +  $this.settings.triangleAlphaMouse + ")";
							$this.ctx.beginPath();
							$this.ctx.moveTo(a.x, a.y);
							$this.ctx.lineTo(b.x, b.y);
							$this.ctx.lineWidth = $this.settings.delaunayStrokeWidth;
							$this.ctx.closePath();
							$this.ctx.stroke();
						}
			        }
			    }
			}

			// Dessiner les agents
		    $this.myAgent.forEach(function(a) {
		    	if($this.settings.mouseActivated) {
					var distanceToMouseSquared = (a.x - mousePosition.x) * (a.x - mousePosition.x) + (a.y - mousePosition.y) * (a.y - mousePosition.y);
				}
		        a.update(distanceToMouseSquared);
		    });

			// Boucler dès que possible
			$this.idAnimFrame = requestAnimationFrame(step);
		};
	};

	canvasBuild.prototype.stopAnim = function(){
		cancelAnimationFrame(this.idAnimFrame);
	};

	/* * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * OTHER FUNCTIONS * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * */

	canvasBuild.prototype.distanceMouseToTriangleCenter = function(a1, a2, a3){
		var x = (a1.x + a2.x + a3.x) / 3;
		var y = (a1.y + a2.y + a3.y) / 3;

		return (x - mousePosition.x) * (x - mousePosition.x) + (y - mousePosition.y) * (y - mousePosition.y);
	};

	canvasBuild.prototype.distancePointToPoint = function(a, b){
		var xs = 0;
		var ys = 0;

		xs = b.x - a.x;
		xs = xs * xs;

		ys = b.y - a.y;
		ys = ys * ys;

		return Math.sqrt( xs + ys );
	};

	/* * * * * * * * * * * * * * * * * *
	 * * * * * * * SETTERS * * * * * * *
	 * * * * * * * * * * * * * * * * * */

	canvasBuild.prototype.setbgColor = function(r, g, b){
		this.settings.backR = parseInt(r);
		this.settings.backG = parseInt(g);
		this.settings.backB = parseInt(b);
	};

	canvasBuild.prototype.setbgAlpha = function(alpha){
		this.settings.backAlpha = alpha;
	};

	canvasBuild.prototype.showPointAgent = function(visibility){
		this.settings.showPointAgent = visibility;
	};

	canvasBuild.prototype.setAgentForm = function(newForm){
		this.settings.agentForm = newForm;
	};

	canvasBuild.prototype.setAgentSize = function(size){
		this.settings.agentSize = size;
		this.settings.agentSizeRandom = false;
	};

	canvasBuild.prototype.setAgentSizeRandom = function(sizeMin, sizeMax){
		this.settings.agentSizeRandom = true;
		this.settings.agentRandomMinSize = sizeMin;
		this.settings.agentRandomMaxSize = sizeMax;
	};

	canvasBuild.prototype.setAgentSpeed = function(speed){
		this.setAgents(this.settings.agentForm, this.settings.nbAgents, this.settings.agentSize, speed, this.settings.agentAlpha, this.settings.showPointAgent);
	};

	canvasBuild.prototype.setNbAgent = function(nb){
		this.setAgents(this.settings.agentForm, nb, this.settings.agentSize, this.settings.maxIncrement, this.settings.agentAlpha, this.settings.showPointAgent);
	};

	canvasBuild.prototype.setAgentAlpha = function(alpha){
		this.setAgents(this.settings.agentForm, this.settings.nbAgents, this.settings.agentSize, this.settings.maxIncrement, alpha, this.settings.showPointAgent);
	};

	canvasBuild.prototype.startDelaunay = function(alpha, color){
		this.settings.triangleAlpha = alpha;
		this.settings.triangleColor = color;
		this.settings.delaunay = true;
	};

	canvasBuild.prototype.delaunayStrokeWidth = function(strokeWidth){
		this.settings.delaunayStrokeWidth = strokeWidth;
	};

	canvasBuild.prototype.delaunayColor = function(color){
		this.settings.triangleColor = color;
	};

	canvasBuild.prototype.stopDelaunay = function(){
		this.settings.delaunay = false;
	};

	canvasBuild.prototype.setAgentFillTwoColors = function(colorOne, colorTwo){
		this.settings.agentFillTwo = true;
		this.settings.agentFillColor = colorOne;
		this.settings.agentFillTwoColor = colorTwo;
	};

	canvasBuild.prototype.setAgentFillColor = function(color){
		this.settings.agentFillTwo = false;
		this.settings.agentFillColor = color;
	};

	canvasBuild.prototype.setAgentGradientSize = function(size){
		if(size < 0) {
			size = size * -1;
		}
		if(!this.settings.agentSizeRandom && size >= this.settings.agentSize) {
			size = this.settings.agentSize - 1;
		}
		this.settings.agentSizeIn = size;
	};

	canvasBuild.prototype.fadeOut = function(){
		this.settings.fadeOut = true;
	};

	canvasBuild.prototype.delaunayMaxDistance = function(alpha, distance){
		this.settings.activeDistanceDelaunay = true;
		this.settings.activeDistanceDelaunayVal = distance;
		this.settings.triangleAlphaMouse = alpha;
	};

	canvasBuild.prototype.delaunayNoDistance = function(){
		this.settings.activeDistanceDelaunay = false;
	};

	canvasBuild.prototype.onWindowResize = function(canvasWidth, canvasHeight){
		this.ctx.width = canvasWidth || document.documentElement.clientWidth;
		this.ctx.height = canvasHeight || document.documentElement.clientHeight;
		this.canvas.width = canvasWidth || document.documentElement.clientWidth;
		this.canvas.height = canvasHeight || document.documentElement.clientHeight;
		this.settings.displaySizeWidth = canvasWidth || document.documentElement.clientWidth;
		this.settings.displaySizeHeight = canvasHeight || document.documentElement.clientHeight;
		this.ctx.fillRect(0, 0, this.settings.displaySizeWidth, this.settings.displaySizeHeight);
	};