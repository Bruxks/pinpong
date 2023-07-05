
  var gameMin=0;
  var gameSec=0;
  var gamePoint=0;
  var gameSecHelp='0';
  var gameMinHelp;
  $( function() {

	
  function sound1() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'snd1.wav'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
function sound2() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'snd2.wav'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
function sound3() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'snd3.wav'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
  
  var mouseX;
   var canvas = document.getElementById('img');
    var ctx = canvas.getContext('2d');
 function clear(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  var KeyLeft=false;
  var KeyRight=false;
  
 var bricks =[];
 var ball =[];
 var plat =[];
 var colors =['red','green','blue','yellow','violet','#03fe03'];
 
 var start;
 
 var platform = new Image();
 platform.src='padd.png';
 platform.onload=function(){};
 
 plat.img =platform;
 plat.x=canvas.width/2-60;
 plat.y=canvas.height-20;
 plat.w=120;
 plat.h=20;

 
 var bw=canvas.width/8-2;
 var bh = 20;
 for(var i=0;i<8;i++){
 bx=(bw+2)*i+1;
 for(var j=0;j<6;j++){
 by=(bh+2)*j+1;
 bricks.push({'x':bx,'y':by,'w':bw,'h':bh,'c':colors[j],'a':true});
 }
 }
ball.x= canvas.width/2;
ball.y= canvas.height-40;
ball.r=10;
ball.dx=0.5;
ball.dy=-7;
function timePoint(){

	if(gameSec>=60){
	gameSec=0;
	gameMin++;
	}
gameSec++
}
	function drawCanvas(){
	if(gameMin<10){
	gameMinHelp='0';
	}else{
	gameMinHelp='';
	}
	if(gameSec<10){
	gameSecHelp='0';
	}else{
	gameSecHelp='';
	}if(gameMin<10){
	gameMinHelp='0';
	}else{
	gameMinHelp='';
	}
	if(gameSec<10){
	gameSecHelp='0';
	}else{
	gameSecHelp='';
	}
	clear();
	if(KeyLeft){
		if(plat.x-10<0){
		plat.x=0;
		}
		else{
	plat.x=plat.x-10;
	}
	}
	if(KeyRight){
	if(plat.x+10>800-plat.w){
		plat.x=800-plat.w;
		}
		else{
	plat.x=plat.x+10;
	}
	}
	
	$.each(bricks,function(index,value){
	if(value.a){
	ctx.fillStyle = value.c;
	ctx.beginPath();
	ctx.fillRect(value.x,value.y,value.w,value.h);
	ctx.closePath();
	ctx.fill();
	
	if(ball.y<value.y+value.h && ball.y>value.y && ball.x<value.x+value.w&&ball.x>value.x&&value.a==true){
	value.a=false;
	ball.dy=-ball.dy;
	sound1();
	gamePoint++
	}
	}
	});
	
	ctx.drawImage(plat.img,plat.x,plat.y);
	
	ctx.fillStyle = 'rgba(255,35,35,1.0)';
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2,false);
	ctx.closePath();
	ctx.fill();
	
	
	if(ball.x+ball.dx+ball.r>canvas.width || ball.x+ball.dx-ball.r<0){
	ball.dx=-ball.dx;
	}
	if(ball.y+ball.dy-ball.r<0){
	ball.dy=-ball.dy;
	}
	else if(ball.y+ball.dy+ball.r>canvas.height-plat.h){
			if(ball.x>plat.x && ball.x<(plat.x+plat.w)){
				ball.dx=10*((ball.x-(plat.x+plat.w/2))/plat.w);
				ball.dy=-ball.dy
				sound3();
		}
		else if(ball.y+ball.dy+ball.r>canvas.height){
		clearInterval(start);
		sound2();
		}
	}
	ball.x+=ball.dx;
	ball.y+=ball.dy;
	
	ctx.font='16px Verdana';
	ctx.fillStyle='#ffffff';
	ctx.fillText('time: '+gameSecHelp+''+gameMin+':'+gameSecHelp+''+gameSec,600,470);
	ctx.fillText('Points: '+gamePoint,600,500);
	}
drawCanvas();


///mousemove
$('#img').mousemove(function(e){
var mouseX=e.pageX || 0;

if(mouseX>(plat.w/2)){
if(mouseX<(canvas.width-plat.w/2)){
plat.x=mouseX-plat.w/2;
}
	else{
	plat.x=canvas.width-plat.w;
	}
		}else{
		plat.x=0;
		}
})

		
$('body').keydown(function(e){
if(e.keyCode==37){
KeyLeft=true;
}
if(e.keyCode==39){
KeyRight=true;
}
})
$('body').keyup(function(e){
if(e.keyCode==39){
KeyRight=false;
}
if(e.keyCode==37){
KeyLeft=false;
}
})
timePoint();
setInterval(timePoint,1000)
start=setInterval(drawCanvas,30);
  } );
  