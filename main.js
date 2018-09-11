var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
//画笔宽度
var lineWidth = 5;

changeView();

function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,360);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  console.log("drawLine")
  console.log("x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2);
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineWidth = lineWidth;
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}

//与用户界面同步
function changeView(){
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
  //默认将Canvas背景变为白色
  context.fillStyle = 'white';
  context.fillRect(0,0,pageWidth,pageHeight);
}

var painting = false;
var lastPoint = {x:undefined,y:undefined};

if(document.body.ontouchstart !== undefined){
  //移动端
  console.log('IS ON MOBILE');
  canvas.ontouchstart = function(start){
    var x = start.touches[0].clientX;
    var y = start.touches[0].clientY;
    painting = true;
    if(usingEraser){
      context.clearRect(x-5,y-5,10,10);
    }else{
      lastPoint = {
        "x" : x,
        "y" : y
      }
    }
  }
  canvas.ontouchmove = function(move){
    var x = move.touches[0].clientX;
    var y = move.touches[0].clientY;
    if(!painting){ return };
    if(usingEraser){
      context.clearRect(x-5,y-5,10,10);
    }else{
      var newPoint = {
        x:x,
        y:y
      }
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
      lastPoint = newPoint;
    }
  }
  canvas.ontouchend = function(end){
    painting = false;
  }
}else{
  //PC
  console.log('IS ON PC');
  canvas.onmousedown = function(down){
  var x = down.clientX;
  var y = down.clientY;
  painting = true;
  if(usingEraser){
    context.clearRect(x-5,y-5,10,10);
  }else{
    lastPoint.x = x;
    lastPoint.y = y;
  }
  }
  canvas.onmousemove = function(move){
    var x = move.clientX;
    var y = move.clientY;
    if(!painting){ return }
    if(usingEraser){
      context.clearRect(x-5,y-5,10,10);
    }else{
      var newPoint = {x:x,y:y};
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
      lastPoint = newPoint;  
    }
  }
  canvas.onmouseup = function(up){
    painting = false;
  }
}

//界面尺寸监听
window.onresize = function(){
  changeView();
}

//橡皮檫、画笔、清屏、保存监听
var usingEraser = false;
pen.onclick = function(){
  usingEraser = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function(){
  usingEraser = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
}
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height);
}
save.onclick = function(){
  var url = canvas.toDataURL("iamge/url");
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '图图';
  a.target = '_blank';
  a.click();
}

//画笔颜色监听
penColorRed.onclick = function(){
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  penColorRed.classList.add('active');
  penColorGreen.classList.remove('active');
  penColorBlue.classList.remove('active');
}
penColorGreen.onclick = function(){
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
  penColorGreen.classList.add('active');
  penColorRed.classList.remove('active');
  penColorBlue.classList.remove('active');
}
penColorBlue.onclick = function(){
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
  penColorBlue.classList.add('active');
  penColorGreen.classList.remove('active');
  penColorRed.classList.remove('active');
}

//画笔粗细监听
thin.onclick = function(){
  lineWidth = 5;
}
thick.onclick = function(){
  lineWidth = 10;
} 
