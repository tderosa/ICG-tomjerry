var canvas = document.getElementById("game");
var gameWorld = boxbox.createWorld(canvas);
gameWorld.gravity(0);

var currScore = 0;

var ammo = {
	name: "ammo",
	shape: "square",
	image: "assets/waterballoon.png",
	imageStretchToFit: true,
	width: 1.5,
	height: 1,
	density: 4,
	onImpact: function(entity, force) {
		if (entity.name() === "target") {
			this.destroy();
		}
	}
}

gameWorld.createEntity({
	name: "agent",
	shape: "circle",
	image: "assets/jerry.png",
	imageStretchToFit: true,
	radius: 1.2,
	x: 1,
	y: 6.4,
	density: 4,
	onKeyDown: function(e) {
		var kc = e.keyCode;
		var pos = this.position();

		if (kc === 73) {
			if (pos.y >= 2) {
				this.position({x: pos.x, y: pos.y-1});
			}
		}
		else if (kc === 75) {
			if (pos.y <= 12) {
				this.position({x: pos.x, y: pos.y+1});
			}
		}
		else if (kc === 70) {
			var pellet = gameWorld.createEntity(ammo, {
				y: pos.y,
				x: pos.x + 2,
			});
			pellet.applyImpulse(60, 90);
		}
	}
});

var target = {
	name: "target",
	shape: "circle",
	image: "assets/tom.png",
	radius: 1.4,
	imageStretchToFit: true,
	onImpact: function(entity, force) {
		if (entity.name() === "ammo") {
			this.destroy();
			currScore = currScore + 10;
			document.getElementById("score").innerHTML = currScore.toString();

			if (currScore === 150) {
				var winPanel = document.getElementById("statusPanel");
				winPanel.style.visibility = "visible";
				clearInterval(timer);
			}
		}
		else if (entity.name() === "agent") {
			var gameOver = document.getElementById("statusPanel");
			gameOver.innerHTML = "<h1>Game Over</h1>";
			gameOver.style.visibility = "visible";
			clearInterval(timer);
		}
	}
};

var timer = setInterval(function () {generateTarget()}, 2000);

function generateTarget() {
	var randY = randomVal(10, 1);
	var randSpeed = randomVal(50, 80);

    var item = gameWorld.createEntity(target, {
    	x: 25,
    	y: randY,
    })
    item.applyImpulse(randSpeed, -90);
}

function randomVal(interval, offset) {
	return offset + Math.random()*interval;
}