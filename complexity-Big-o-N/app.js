
var n=4; //numbers of parts
var y= new Array();
var x= new Array();

y[0]=80;
y[1]=80;
y[2]=80;
y[3]=80;

x[0]=102;
x[1]=94;
x[2]=88;
x[3]=80;
var v;
function pro(v) {
	n=v;
	y[0]=80;
	x[0]=120;
	v=1;

	while(v<n){
		x[v]=0;
		y[v]=0;

		v++;
	}

	addps();
}

function start() {
n=4;
document.getElementById('frame').innerHTML= '<div id="ps0" class="partOfSnake partHeadOfSnake0"></div><div id="ps1" class="partOfSnake"></div><div id="ps2" class="partOfSnake"></div><div id="ps3" class="partOfSnake"></div><div id="food" class="food"></div>';


	y[0]=80;
	y[1]=80;
	y[2]=80;
	y[3]=80;

	x[0]=100;
	x[1]=90;
	x[2]=80;
	x[3]=70;


	document.getElementById('ps0').style.marginTop = y[0]+"px";
	document.getElementById('ps0').style.marginLeft = x[0]+"px";

	document.getElementById('ps1').style.marginTop = y[1]+"px";
	document.getElementById('ps1').style.marginLeft = x[1]+"px";

	document.getElementById('ps2').style.marginTop = y[2]+"px";
	document.getElementById('ps2').style.marginLeft = x[2]+"px";

	document.getElementById('ps3').style.marginTop = y[3]+"px";
	document.getElementById('ps3').style.marginLeft = x[3]+"px";

	randomPositionFood();
}

start();



//dp: displacement // dpx: displacement on the axis x....

var i, im1, dp=10, dpx=10, dpy=0, idps, kx, ky, d, xPosFood, yPosFood, soucre=0, ss, jps=0;
var chadd, nameadd, iadd;

function addps() {

	iadd=1;
	chadd="";
	while(iadd<n){
		chadd=chadd+'<div id="ps'+iadd+'" class="partOfSnake" style="margin-left:'+x[iadd]+'px; margin-top:'+y[iadd]+'px;"></div>';
		iadd++;
	}

	document.getElementById('frame').innerHTML= '<div id="ps0" class="partOfSnake partHeadOfSnake0" style="margin-left:'+x[0]+'px; margin-top:'+y[0]+'px;"></div>'+chadd+'<div id="food" class="food"></div>';

randomPositionFood();

}

function ver() {
	if(x[0]<0 || x[0]>630 || y[0]<0 || y[0]>430){
		
		dpx=dp;
		dpy=0;
		start();

	}
	
	if(x[0]==xPosFood && y[0]==yPosFood){
		//function hamham

		x[n]=kx;
		y[n]=ky;
		n++;

		addps();

	}


		soucre+=60;
		ss=soucre/1000;
		ss=Math.floor(ss);

//		document.getElementById('comment').innerHTML = ss;
	


// ver ps
	jps=1;
	while(jps<n){

		if(y[0]==y[jps] && x[0]==x[jps]){
			dpx=dp;
			dpy=0;
			start();
		}

		jps++;

	}
}

function randomPositionFood() {
xPosFood= Math.floor(Math.random() * 64) *10;
yPosFood= Math.floor(Math.random() * 44) *10;


	document.getElementById('food').style.marginTop = yPosFood+"px";
	document.getElementById('food').style.marginLeft = xPosFood+"px";

}

//function of moving 
function move() {
	
	i=1;

	kx=x[0];
	ky=y[0];

	while(i<n){

		im1=i-1;

		ikx=x[i];
		iky=y[i];

		x[i]=kx;
		y[i]=ky;

		kx=ikx;
		ky=iky;
		

		idps="ps"+i;

		document.getElementById(idps).style.marginTop = y[i]+"px";
		document.getElementById(idps).style.marginLeft = x[i]+"px";

		i++;
	}

	x[0]+=dpx;
	y[0]+=dpy;
	idps="ps0";
	document.getElementById(idps).style.marginTop = y[0]+"px";
	document.getElementById(idps).style.marginLeft = x[0]+"px";

	ver();

	d=0;

}
//setInterval for function of moving
setInterval(move, 70);

//Event click ArrowLeft/ArrowUp/ArrowRight/ArrowDown
function clickButton(event) {


	if(event.keyCode==37 && dpx==0 && d==0){//right
		dpx=-dp;
		dpy=0;
		d=1;
	}else if(event.keyCode==38 && dpy==0 && d==0){//Up
		dpx=0;
		dpy=-dp;
		d=2;
	}else if(event.keyCode==39 && dpx==0 && d==0){//left
		dpx=dp;
		dpy=0;
		d=3;
	}else if(event.keyCode==40 && dpy==0 && d==0){//Down
		dpx=0;
		dpy=dp;
		d=4;
	}

	
}