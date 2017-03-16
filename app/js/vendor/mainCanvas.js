var canvas, ctx;
var nbAgents = 80;
var sampleRate = 400;
var t = 0;
var agentLinks = [];

function createAgents() {
    for (var i = 0; i < nbAgents; i++) {
        var whatColorToGive = parseInt(Math.random() * 2 + 1);
        var alpha = Math.random() * .8  + .4;
        if(whatColorToGive == 1) {
            var type = "pic";
            var color = "rgba(110,83,55, " + alpha + ")";
        } else {
            var type = "web";
            var color = "rgba(191,129,72, " + alpha + ")";
        }
        agentLinks.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            moveSpeed: Math.random() * 1 + 1,
            amplitude: Math.random() * 100 + 45,
            length: Math.random() * (1.5 * canvas.height / 2480) + .5,
            frequency: Math.random() * 2 + .2,
            alpha: alpha,
            hand: Math.random() * 8 + 3,
            color: color
        });
    }
}

$(document).ready(function() {

    canvas =  document.getElementById('agentContainer');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);

    createAgents();

    function translate(value, leftMin, leftMax, rightMin, rightMax) {
        "use strict";
        var leftSpan = leftMax - leftMin;
        var rightSpan = rightMax - rightMin;
        var scaled = (value - leftMin) / leftSpan;

        return rightMin + scaled * rightSpan;
    }

    function drawAgentLink(agentLink, t, idx) {
        var location = translate(idx, 0, agentLinks.length, -Math.PI * 1, Math.PI * 1);
        var x = 0;
        var y = 0;
        var startX = Math.sin(location) * 24;
        var startY = Math.cos(location) * 24;
        ctx.save();
        ctx.translate(startX + agentLink.x, startY + agentLink.y);
        ctx.rotate(-location);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = agentLink.color;
        for (var i = 0; i < agentLink.length; i += 1/sampleRate) {
            y = Math.sin(agentLink.frequency * i + t * agentLink.moveSpeed) * agentLink.amplitude;
            y *= i / agentLink.length;
            x += 1;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, agentLink.hand, 0, 2 * Math.PI);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        ctx.restore();
    }

    var paused = false;
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                function(callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

    function render() {
        if (!paused) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            t += 1;
            agentLinks.forEach(function (agentLink, i) {
                // var distanceToMouseSquared = (agentLink.x - mousePosition.x) * (agentLink.x - mousePosition.x) + (agentLink.y - mousePosition.y) * (agentLink.y - mousePosition.y);
                drawAgentLink(agentLink, t/sampleRate, i);
            });

            requestAnimationFrame(render);
        }
    }

    render();

});





$(window).resize(function() {
    ctx.width = document.documentElement.clientWidth;
    ctx.height = document.documentElement.clientHeight;
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    ctx.fillRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
    agentLinks = [];
    createAgents();
});