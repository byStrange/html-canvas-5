const canvas = document.getElementById('c');
let ctx = canvas.getContext('2d')



function setSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

setSize()

let mouse = {
    x: undefined, 
    y: undefined
}

const gravity = 2
const friction = 0.9
window.addEventListener('click', function(ev) {
    mouse.x = ev.x;
    mouse.y = ev.y;
})

//window.addEventListener('resize', setSize)

class Ball {
    constructor(x, y, speedY,ms, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = speedY ;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(
            this.x, 
            this.y,
            this.radius, 
            0,
            Math.PI * 2
        )
        ctx.fillStyle = this.color;
        ctx.fill()
    }
    
    update(){
        
        if(this.y + this.radius > innerHeight) {
            this.dy = -this.dy * friction
        } else{
            this.dy += gravity
        }
        this.y += this.dy 
        this.draw()
    }
    
}
const ballsCount = 250
let ball
let balls = []
function init() {
    for(let i = 0; i < ballsCount; i++) {
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let speedY = Math.random()
        let rad = Math.random() * 30;
        let color = (function() {
            return '#' + Math.round(Math.random() * 0xffffff).toString(16)
        })() 
        balls.push(
            new Ball(x, y, speedY, null, rad, color)
        )
    }
    ball = new Ball( innerWidth / 2, innerHeight / 2, 2, 1, 30, 'red')
}

function animate() 
{
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight)
    balls.forEach(ball => {
        ball.update()
    })
}
init()
animate()