// We use the "var" to change it from within whatever function it is

var n=4; //numbers of parts (init by 4)
var y= new Array();
var x= new Array();

//The y axis
y[0]=80;
y[1]=80;
y[2]=80;
y[3]=80;

//The x axis
x[0]=100;
x[1]=90;
x[2]=80;
x[3]=70;


//Hold the snake parts in place at each start
function start() {
n=4;
//Frame refill (HTML div of id: frame)
document.getElementById('frame').innerHTML= '<div id="ps0" class="partOfSnake partHeadOfSnake0"></div><div id="ps1" class="partOfSnake"></div><div id="ps2" class="partOfSnake"></div><div id="ps3" class="partOfSnake"></div><div id="food" class="food"></div>';

//Definition of places
	y[0]=80;
	y[1]=80;
	y[2]=80;
	y[3]=80;

	x[0]=100;
	x[1]=90;
	x[2]=80;
	x[3]=70;


	//Putting the initial parts across the css-style
	document.getElementById('ps0').style.marginTop = y[0]+"px";
	document.getElementById('ps0').style.marginLeft = x[0]+"px";

	document.getElementById('ps1').style.marginTop = y[1]+"px";
	document.getElementById('ps1').style.marginLeft = x[1]+"px";

	document.getElementById('ps2').style.marginTop = y[2]+"px";
	document.getElementById('ps2').style.marginLeft = x[2]+"px";

	document.getElementById('ps3').style.marginTop = y[3]+"px";
	document.getElementById('ps3').style.marginLeft = x[3]+"px";

	//To put the eating snake in a random place - Random values - then - across the css-style
	randomPositionFood();
}

//Call function
start();

var i,
	im1,
	dp=10, //dp: Amount of movement (fix-const)
			//If dxp=dp && dyp=0 => horizontal movement (At every start)
			//If dyp=dp && dxp=0 => vertical movement
	dpx=10, // dpx: displacement on the axis x (Amount of movement on the x-axis). //it changes if there is a change in the axis of movement (take dp)
	dpy=0, // dpy: displacement on the axis y (Amount of movement on the y-axis). //it changes if there is a change in the axis of movement
	idps, //HTML-ID of part of the snake
	kx, //Assistant to take a value from the x-axis
	ky, //Assistant to take a value from the y-axis
	d, 
	xPosFood, //xPosFood: position of Food of snake on the x-axis.. Changing randomly every eating process.
	yPosFood, //yPosFood: position of Food of snake on the x-axis.. Changing randomly every eating process
	jps=0;

var chadd, nameadd, iadd;


//When eating we add a n new part of Snake. //addps id add-part-snake
function addps() {

	iadd=1;
	chadd="";
	while(iadd<n){
		chadd=chadd+'<div id="ps'+iadd+'" class="partOfSnake" style="margin-left:'+x[iadd]+'px; margin-top:'+y[iadd]+'px;"></div>';
		iadd++;
	}

	document.getElementById('frame').innerHTML= '<div id="ps0" class="partOfSnake partHeadOfSnake0" style="margin-left:'+x[0]+'px; margin-top:'+y[0]+'px;"></div>'+chadd+'<div id="food" class="food"></div>';

//New random play to Food of snake
randomPositionFood();

}

//This function occurs for every movement, Because it is a complete verification function (Eating check - Check loss)
function verification() {
	//When losing - Touching the wall (the frame)
	if(x[0]<0 || x[0]>630 || y[0]<0 || y[0]>430){
		
		dpx=dp;
		dpy=0;
		//Start or Restat
		start();

	}

	//When eating
	//If the head of Snake == Position (x, y) of food - Means when eating
	if(x[0]==xPosFood && y[0]==yPosFood){
		

		x[n]=kx;
		y[n]=ky;
		n++;

		//Add a new part of snake
		addps();

	}


// Touching a part of the snake - Lose -> Start
	jps=1;
	while(jps<n){

		if(y[0]==y[jps] && x[0]==x[jps]){
			dpx=dp; //Means horizontal movement
			dpy=0;
			//Start or Restat
			start();
		}

		jps++;

	}
}

//This function set a new parametres x,y to Food of Snake
function randomPositionFood() {
xPosFood= Math.floor(Math.random() * 64) *10;
yPosFood= Math.floor(Math.random() * 44) *10;


	document.getElementById('food').style.marginTop = yPosFood+"px";
	document.getElementById('food').style.marginLeft = xPosFood+"px";

}

//Function of moving.. move-function
function move() {
	
	i=1;

	kx=x[0];
	ky=y[0];
	//Each point takes subsequent point values
	while(i<n){

		im1=i-1;

		ikx=x[i];
		iky=y[i];

		x[i]=kx;
		y[i]=ky;

		kx=ikx;
		ky=iky;
		

		idps="ps"+i;
		//To change place (x,y) by style
		document.getElementById(idps).style.marginTop = y[i]+"px";
		document.getElementById(idps).style.marginLeft = x[i]+"px";

		i++;
	}
	//Head of snake
	x[0]+=dpx; //dpx is Amount of movement on the x-axis
	y[0]+=dpy; //dpy is Amount of movement on the y-axis
	idps="ps0";
	document.getElementById(idps).style.marginTop = y[0]+"px";
	document.getElementById(idps).style.marginLeft = x[0]+"px";

	verification();

	d=0;

}
//setInterval for function of moving - apply move-function every 70ms
setInterval(move, 65);

//Event click ArrowLeft/ArrowUp/ArrowRight/ArrowDown "when tap keyboard"
function clickButton(event) {


	if(event.keyCode==37 && dpx==0 && d==0){//Left
		dpx=-dp;
		dpy=0;
		d=1;
	}else if(event.keyCode==38 && dpy==0 && d==0){//Down
		dpx=0;
		dpy=-dp;
		d=2;
	}else if(event.keyCode==39 && dpx==0 && d==0){//right
		dpx=dp;
		dpy=0;
		d=3;
	}else if(event.keyCode==40 && dpy==0 && d==0){//UP
		dpx=0;
		dpy=dp;
		d=4;
	}

	
}