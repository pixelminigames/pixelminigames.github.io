var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 100;
canvas.height = 200;
var start = function(){
	var bx = 0, by = 0;
	var r = "#FF0000", g = "#00FF00", b = "#0000FF";
	var colorList = [r, g, b];
	var score = 0;
	function randInt(min, max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	var player = {
		w: 8,	//width
		h: 8,	//height
		x: canvas.width / 2 - 4,	//x position
		y: canvas.height - 24,		//y position
		color: r
	};
	var bar = {
		w: 250,
		h: 8,
		x: bx,
		y: by,
		color: colorList[randInt(0, 2)],
		speed: 3
	}
	document.onkeydown = function(e){
		if(e.keyCode == 37){
			player.color = r;
		}else if(e.keyCode == 40){
			player.color = g;
		}else if(e.keyCode == 39){
			player.color = b;
		}
	}
	var gameLoop = setInterval(function(){
		ctx.clearRect(0, 0, 100, 200)
		ctx.fillStyle = "#000000";
		var strScore = "" + score;
		ctx.fillText("" + score, 46 - strScore.length, 10)
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x, player.y, player.w, player.h)
		if(bar.y >= player.y && bar.y < player.y + player.h && player.color != bar.color){
			start();
			clearInterval(gameLoop);
		}else{	
			if(bar.y < 200){
				ctx.fillStyle = bar.color;
				ctx.fillRect(bar.x, bar.y, bar.w, bar.h)
				bar.y += bar.speed;
			}else if(bar.y >= 200){
				score++;
				bar.color = colorList[randInt(0, 2)];
				bar.y = 0;
				if(bar.speed < 8.4){
					bar.speed += 0.3;
				}
			}
		}
	}, 1000 / 25);	//25 fps
}
start();