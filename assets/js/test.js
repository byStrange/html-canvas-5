const canvas = document.querySelector("#c");

const ctx = canvas.getContext("2d");

let set = {
  style: function() {
      canvas.style = `
        background: #151515
    `
    document.querySelector("*").style = `
            margin : 0;
            padding: 0;
            box-sizing: border-box;
        `;
  },
  size: function(w, h) {
    canvas.width = w;
    canvas.height = h;
  }
};
set.style()
set.size(innerWidth, innerHeight)
let get = {
  random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  hexColor() {
    return "#" + Math.round(Math.random() * 0xffffff).toString(16);
  },
  rgbColor() {
    let hexValue = get.hexColor().length >= 6 ? get.hexColor() : get.hexColor();
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    console.log(hex);
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(rgb);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

//ctx.beginPath()
//ctx.lineWidth = 3
//ctx.moveTo(50, 50)
//let x =0
//let y = 0
//function draw() {
//    requestAnimationFrame(draw)
//    if (x < 50 && y < 150) {
//            ctx.lineTo(x, y)
//        x += 1
//        y += 1
//        if (x == 49 && y == 149) {
//            x = 0;
//            y = 0
//        }
//    }
////    ctx.lineTo(150, 150)
////    ctx.lineTo(150, 50)
////    ctx.lineTo(48.5, 50)
//}
//draw()
ctx.fillStyle = get.hexColor()
ctx.fill()
ctx.strokeStyle = get.hexColor()
//
//ctx.stroke()

var vertices=[];
vertices.push({x: innerWidth / 2 - 150,y:innerHeight / 2 - 150});
vertices.push({x:innerWidth / 2 - 150, y: innerHeight / 2 });
vertices.push({x:innerWidth / 2 + 20,y: innerHeight / 2 });
vertices.push({x:innerWidth / 2 + 20,y: innerHeight / 2 - 150});
vertices.push({x:innerWidth / 2 - 150,y: innerHeight / 2 - 150  });

// calc waypoints traveling along vertices
function calcWaypoints(vertices){
    var waypoints=[];
    for(var i=1;i<vertices.length;i++){
        var pt0=vertices[i-1];
        var pt1=vertices[i];
        var dx=pt1.x-pt0.x;
        var dy=pt1.y-pt0.y;
        for(var j=0;j<100;j++){
            var x=pt0.x+dx*j/100;
            var y=pt0.y+dy*j/100;
            waypoints.push({x:x,y:y});
        }
    }
    return(waypoints);
}

var points=calcWaypoints(vertices);


// variable to hold how many frames have elapsed in the animation
// t represents each waypoint along the path and is incremented in the animation loop
var t=1;


// start the animation
animate();

// incrementally draw additional line segments along the path
function animate(){
    if(t<points.length-1){ requestAnimationFrame(animate); }
    if(t > points.length) {
        ctx.fill()
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
    ctx.moveTo(points[t-1].x,points[t-1].y);
    ctx.lineTo(points[t].x,points[t].y);
    ctx.stroke();
    // increment "t" to get the next waypoint
    t++;
}