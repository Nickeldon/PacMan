const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight



class Boundary {
    static width = 25
    static height = 25
    constructor({ position, velocity }) {
this.position = position
this.width = 25
this.height = 25
    }
   draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
   }
}

class PacMan {
    static width = 10
    static height = 10
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 10

    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        
    }
}

class pause {
    
}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    p: {
        pressed: false
    }
}

let lastkey = ''

const map = [
    ['-','-','-','-','-','-','-'], 
    ['-',' ',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-'],
    ['-',' ',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-','-'],

]

const boundaries = []
const pacman = new PacMan({
    position: {
        x:Boundary.width + Boundary.width/2,
        y:Boundary.height + Boundary.height/2
    },
    velocity: {
        x:0,
        y:0
        }
})

map.forEach((row, i) => {
   row.forEach((symbol, j) => {
    switch (symbol) {
case '-':
    boundaries.push(
        new Boundary({
            position: {
                x: Boundary.width * j,
                y: Boundary.height * i
            }
        })
        )
    break
    }
   })  
});


function circleCollidesWithrectangle({
    circle,
    rectangle
}){
    return(
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y && circle.position.x - circle.radius + circle.velocity.x  <= rectangle.position.x + rectangle.width
    )
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()

        if (
            circleCollidesWithrectangle(
               { circle: pacman,
                rectangle: boundary
            }
            )
        ) {
            
                pacman.velocity.x = 0
                pacman.velocity.y = 0

            
            
        } 

        
        
    })
    
    pacman.update()
     pacman.velocity.y = 0
     pacman.velocity.x = 0

    
     if (keys.w.pressed && lastkey === 'w') {
        for (let i = 0; i < boundaries.length; i++){
         const boundary = boundaries[i]
         if (
             circleCollidesWithrectangle(
                { circle: {
                 ...pacman,
                  velocity: {
                 x: 0,
                 y: -5
                }},
                 rectangle: boundary
             } ))  
             {
                 pacman.velocity.y = 0
                 break
             }  else {
                 pacman.velocity.y = -5
             }
         
         
         
     }}
    else if (keys.a.pressed && lastkey === 'a') {
        boundaries.forEach((boundary) => {
                pacman.velocity.x = -5  
        
        
    })}
    
    else if (keys.s.pressed && lastkey === 's') {
                pacman.velocity.y = 5
            
        
       
    }
    else if (keys.d.pressed && lastkey === 'd') {
               pacman.velocity.x = 5 
    }
    else if (keys.p.pressed && lastkey === 'p') {
    console.log("Pause")
}
    
};


animate()




 







class Apple {
    static width = 10
    static height = 10
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }
    draw() {

        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
   
}

const apple = new Apple({
    position: {
        x: 200,
        y:200
    },
    velocity: {
        x: 0,
        y:0
    }


});
apple.draw()

addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
            case 'a':
                keys.a.pressed = true
                lastkey = 'a'
            break
            case 's':
                keys.s.pressed = true
                lastkey = 's'
            break
            case 'd':
                keys.d.pressed = true
                lastkey = 'd'
            break
            case 'p':
                keys.p.pressed = true
            break
    }

    
})

addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'w':
            keys.w.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break
            case 's':
                keys.s.pressed = false
            break
            case 'd':
                keys.d.pressed = false
            break
            case 'p':
                keys.p.pressed = false
            break
    }

})

class Ghosts {
    constructor({position, velocity}) {
            this.position = position
            this.velocity = velocity
            this.width = 15
            this.height = 20

    }
    draw() {
        c.beginPath()
       c.fillStyle = 'green'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.closePath()
   
    }
    
    
   
}


const ghosts = new Ghosts({
    position: {
        x: 200,
        y:200
    },
    velocity: {
        x: 0,
        y:0
    }


});
ghosts.draw()
