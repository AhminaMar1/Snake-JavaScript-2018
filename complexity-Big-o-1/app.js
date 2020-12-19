//Recreate a snake game with Complexity O(1) when playing.
// Complexty of all (move - verification - ver Self-collision /functions) is O(1)
// Complexty of Initialization of playing (start / function) is O(n)

//--: Queue-data-structure for snake moving.. And a similar method to hashTable to verifie the Self-Collision.


class queue{

    head=0;
    tail=0;
    size=0;
    data={};



    push=(el)=>{   
        
        this.data[this.head]=el;
        
        this.head++;
        this.size++;
    }

    pull=()=>{
        
        if(this.tail<this.head){
            delete this.data[this.tail];
            this.tail++;
            this.size--;
        }
    
    }

    pullAll=()=>{

        delete this.data;
        this.size=0;
        this.head=0;
        this.tail=0;

    }
    lastPsN=()=>{
        if(this.size>0){
            return this.data[this.tail].psN;
        }
    }

    xyTail=()=>{
        if(this.size>0){
            return this.data[this.tail];
        }
    }

}

var snakeQueue= new queue();

var xHead=100,yHead=80;
var xMax=630, yMax=430;

var map=Array((yMax*10)+(xMax/10)+1); // To defining the filled places in the board.. when move we change the head and the tail  (jist) for (O(1)).. method as hashtable

//Hold the snake parts in place at each start
function start() {
    document.getElementById("new_part").innerHTML = "";
    let maxI=4;
    xHead=60+(10*maxI);
    yHead=80;

    delete snakeQueue;
    map.fill(0);
    snakeQueue= new queue();

    //Putting the initial parts across the css-style
    
    document.getElementById('ps0').style.marginTop = yHead+"px";
    document.getElementById('ps0').style.marginLeft = xHead+"px";



    for(let i=1; i<maxI ;i++){

        if(i>=4){
            let psNText='ps'+i;
            let newPartDOM = document.createElement("DIV");
            newPartDOM.className = "partOfSnake";
            newPartDOM.id = psNText;
    
            document.getElementById("new_part").appendChild(newPartDOM);
        }

        let positionX=60+(10*i);
        let positionY=80;
        snakeQueue.push({
            x: positionX,
            y: positionY,
            psN: i
        });

        let psN="ps"+(i);

        document.getElementById(psN).style.marginTop = positionY+"px";
        document.getElementById(psN).style.marginLeft = positionX+"px";

        map[(positionX/10)+(positionY*10)]=1;
    }

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

//This function set a new parametres x,y to Food of Snake
function randomPositionFood() {
    xPosFood= Math.floor(Math.random() * 64) *10;
    yPosFood= Math.floor(Math.random() * 44) *10;
    
    
        document.getElementById('food').style.marginTop = yPosFood+"px";
        document.getElementById('food').style.marginLeft = xPosFood+"px";
    
}
    

//When eating we add a n new part of Snake. //addps id add-part-snake
function addps(prevXhead, prevYHead, psN) {

    let psNText='ps'+psN;

    let newPart={
        x: prevXhead,
        y: prevYHead,
        psN: psN
    };

    snakeQueue.push(newPart);

    let newPartDOM = document.createElement("DIV");
    newPartDOM.className = "partOfSnake";
    newPartDOM.id = psNText;

    document.getElementById("new_part").appendChild(newPartDOM);

    document.getElementById(psNText).style.marginTop = prevYHead+"px";
    document.getElementById(psNText).style.marginLeft = prevXhead+"px";
    
    map[(prevXhead/10)+prevYHead*10]=1;


    //New random play to Food of snake
    randomPositionFood();

}

//This function occurs for every movement, Because it is a complete verification function (Eating check - Check loss)
function verification() {
	//When losing - Touching the wall (the frame)
	if(xHead<0 || xHead>xMax || yHead<0 || yHead>yMax){
		
		dpx=dp;
        dpy=0;
    
        start();

        return false;

	}

	//When eating
	//If the head of Snake == Position (x, y) of food - Means when eating
	if(xHead==xPosFood && yHead==yPosFood){
		
        return true; //To add a new part of snake
		
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
    let prevXhead=xHead, prevYHead=yHead;
    
    let psN=snakeQueue.size+1;
    
    
    xHead+=dpx;
    yHead+=dpy;

    let verifVar=verification();
    if(verifVar){ //if new part (eating)
        
        addps(prevXhead, prevYHead, psN);

    }else if(verifVar!==false){ //Only movement


        let tail=snakeQueue.xyTail();

        let psNTail=tail['psN'];
        let xTail=tail['x'];
        let yTail=tail['y'];
                
        let psNText='ps'+psNTail;
        
        let newPart={
            x: prevXhead,
            y: prevYHead,
            psN: psNTail
        };
        snakeQueue.pull();
        snakeQueue.push(newPart);

        document.getElementById(psNText).style.marginTop = prevYHead+"px";
        document.getElementById(psNText).style.marginLeft = prevXhead+"px";

        map[(prevXhead/10)+(prevYHead*10)]=1;
        map[(xTail/10)+(yTail*10)]=0;
        

    }


    document.getElementById('ps0').style.marginTop = yHead+"px";
    document.getElementById('ps0').style.marginLeft = xHead+"px";
    

    let mapHead=(xHead/10)+(yHead*10);
    if(map[mapHead]===1){//Self-collision
        
        // Direction of move
        dpx=dp;
		dpy=0;
        //Re start
        start();
    }

    d=0;

}


//setInterval for function of moving - apply move-function every 70ms
setInterval(move, 65);


//Event click ArrowLeft/ArrowUp/ArrowRight/ArrowDown "when tap keyboard"
function clickButton(event) {


	if(event.keyCode==37 && dpx==0 && d==0){//left
		dpx=-dp;
		dpy=0;
		d=1;
	}else if(event.keyCode==38 && dpy==0 && d==0){//Down
		dpx=0;
		dpy=-dp;
		d=2;
	}else if(event.keyCode==39 && dpx==0 && d==0){//Right
		dpx=dp;
		dpy=0;
		d=3;
	}else if(event.keyCode==40 && dpy==0 && d==0){//Up
		dpx=0;
		dpy=dp;
        d=4;
	}

	
}