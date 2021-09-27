var canvas,crayon,timeLimit=14,lastTime=0,looping=!0,BGCOLORS=[{name:"black",hex:"#000"},{name:"white",hex:"#FFF"},{name:"pink",hex:"#FFC0CB"}],FGCOLORS=[{name:"red",hex:"#f44336"},{name:"pink",hex:"#E91E63"},{name:"purple",hex:"#9C27B0"},{name:"deeppurple",hex:"#673AB7"},{name:"indigo",hex:"#3F51B5"},{name:"blue",hex:"#2196F3"},{name:"lightblue",hex:"#03A9F4"},{name:"cyan",hex:"#00BCD4"},{name:"teal",hex:"#009688"},{name:"green",hex:"#4CAF50"},{name:"lightgreen",hex:"#8BC34A"},{name:"lime",hex:"#CDDC39"},{name:"yellow",hex:"#FFEB3B"},{name:"amber",hex:"#FFC107"},{name:"orange",hex:"#FF9800"},{name:"deeporange",hex:"#FF5722"},{name:"brown",hex:"#795548"},{name:"grey",hex:"#9E9E9E"}],CRAYONSIZES=[{name:"SM",size:30},{name:"MD",size:40},{name:"LG",size:50}],setCanvasSize=function(){document.querySelector("header");var e=window.innerHeight-document.querySelector("header").offsetHeight;return{width:window.innerWidth,height:e}},renderColorPalette=function(){for(var e="32px",t=0;t<FGCOLORS.length;t++){(i=document.createElement("div")).style.backgroundColor=FGCOLORS[t].hex,i.style.width=i.style.height=e,i.classList.add("fg","tile"),document.querySelector(".fg-colors").appendChild(i)}for(var n=0;n<BGCOLORS.length;n++){(i=document.createElement("div")).style.backgroundColor=BGCOLORS[n].hex,i.style.width=i.style.height=e,i.classList.add("bg","tile"),document.querySelector(".bg-colors").appendChild(i)}for(var a=0;a<CRAYONSIZES.length;a++){var i;(i=document.createElement("div")).classList.add("size","tile"),i.style.width=i.style.height=e,i.innerHTML=CRAYONSIZES[a].name,document.querySelector(".crayon-sizes").appendChild(i)}},updateColorPalette=function(e,t,n){for(var a=document.querySelectorAll(".active"),i=0;i<a.length;i++)a[i].classList.remove("active");document.querySelector("#canvas-container").style.backgroundColor=BGCOLORS[e].hex,document.querySelectorAll(".bg")[e].classList.add("active"),document.querySelectorAll(".fg")[t].classList.add("active"),document.querySelectorAll(".size")[n].classList.add("active")};function resetCanvas(){clear();var e=floor(random(0,BGCOLORS.length)),t=floor(random(0,FGCOLORS.length)),n=floor(random(0,CRAYONSIZES.length));updateColorPalette(e,t,n),crayon.setColorAndSize(t,n)}function setup(){var e=setCanvasSize(),t=e.width,n=e.height;noStroke(),renderColorPalette(),(canvas=createCanvas(t,n)).parent("canvas-container"),crayon=new Crayon(mouseX,mouseY),resetCanvas()}function draw(){crayon.draw(),crayon.update();var e=millis();if(e<lastTime+1e3*timeLimit){var t=radians(360/timeLimit*(e/1e3)-90);fill(crayon.color),arc(width-40,height-40,40,40,PI+HALF_PI,t)}else lastTime=millis(),resetCanvas()}function Crayon(e,t){this.x=e,this.y=t,this.color,this.size,this.draw=function(){fill(this.color),mouseIsPressed||(ellipseMode(CENTER),ellipse(this.x,this.y,this.size,this.size))},this.update=function(){this.x=mouseX,this.y=mouseY},this.setColorAndSize=function(e,t){this.color=FGCOLORS[e].hex,this.size=CRAYONSIZES[t].size}}function windowResized(){var e=setCanvasSize(),t=e.width,n=e.height;resizeCanvas(t,n)}function keyPressed(){" "==key&&togglePlaying()}function togglePlaying(){1==looping?(noLoop(),looping=!1):(loop(),looping=!0)}