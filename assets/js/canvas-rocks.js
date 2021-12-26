const ctx = c.getContext('2d');

var fullX = innerWidth

var fullY = innerHeight

const circleCount = 800

const distance = 50

const maxRadius = 40



const colors = [
    '#EA5C2B',
    '#FF7F3F',
    '#F6D860',
    '#95CD41' /*You can put your color palette here*/
];

const stroke = false

const clear = true

function setSize() {
    c.width = fullX;
    c.height = fullY;
}
setSize()

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x
    mouse.y = e.y
})
window.addEventListener('resize', setSize)
function hexColor() {
    return "#" + (
        Math.floor(
            Math.random() * 0xffffff
        )
        .toString(16)
    )
}


// for (let i = 0; i < circleCount; i++) {
//     function animate() {
//         requestAnimationFrame(animate)
//         ctx.beginPath()
//         ctx.strokeStyle = hexColor()
//         let posX = Math.random() * fullX
//         let posY = Math.random() * fullY
//         ctx.arc(
//             posX,
//             posY,
//             40,
//             0,
//             Math.PI * 2,
//             true
//         )
//         ctx.stroke()
//     }
//     animate()
// }

function _random(x, round=true) {
	if(x == undefined) {
		return Math.random()
	}
	if (!round) {
		return Math.random() * x
	}

	else return Math.round(Math.random() * x)
}

function Circle(x, y, r, spx, spy) {
	
	this.x = x
	this.y = y 
	this.rad = r
	this.speedX = spx
	this.speedY = spy
    this.color =  colors[_random(colors.length)]
    this.minRadius = r
	this.draw = function() {
		ctx.beginPath();
		ctx.strokeStyle = hexColor()
		ctx.arc(
			this.x,this.y,
			this.rad, 0,Math.PI * 2
		)

        stroke ? ctx.stroke() : console.log()
        
        ctx.fillStyle = this.color
        
        ctx.fill()
	}


	this.update = function () {

		if (this.x + this.rad > fullX || this.x  < 0) {
			this.speedX = -this.speedX;
		}
		
		if(this.y + this.rad  > fullY || this.y < 0 ) {
			this.speedY = -this.speedY
		}
 		
 		this.x += this.speedX;
		this.y += this.speedY;
        let rad = this.rad
        if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if (this.rad < maxRadius) {
                this.rad += 8
            }
        } else if (this.rad > this.minRadius) {
            this.rad -= 1
        }
        
        
		this.draw()
	}
}
let circles = []
for (let i = 0 ; i < circleCount; i++ ) {
	let x = _random(fullX)
	let y = _random(fullY)
	let dx = (_random(1) - 0.5) 
	let dy = (_random(1) - 0.5 ) 
	let rad = _random(10) + 1 
	circles.push(
		new Circle(
			x, y, rad, dx , dy
		)
	)
}

function me() {
	requestAnimationFrame(me);
	 if (clear) {
         ctx.clearRect(0, 0 , fullX, fullY)
     }
	circles.forEach(eachCircle => {
		eachCircle.update()
	})
}
me()

// let x = y = 300;
// let speedX = speedY = 2;
// let w = 150
// let h = 150
// ctx.fillStyle = hexColor()
// function move() {
// 	requestAnimationFrame(move)
// 	ctx.clearRect(0, 0, fullX, fullY)
// 	rect.draw()
// 	// ctx.fillRect(x, y, w, h)
// 	// if (x + w > fullX || x  < 0) {
// 	// 	speedX = -speedX;
// 	// }
// 	// if(y + h  > fullY || y  < 0) {
// 	// 	speedY = -speedY
// 	// }
//  // 	x += speedX;
// 	// y += speedY;
// }
// move()
