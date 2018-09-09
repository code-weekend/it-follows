
// Classes
class Sprite {
    constructor(canvas, position, size) {
        this.position = {x: 0, y: 0}
        this.size = {h: 20, w: 20}
        if (position) this.position = position
        if (size) this.size = size
        if (canvas) this.canvas = canvas

        this.render = this.render.bind(this)
    }

    render() {
        if (this.canvas.getContext) {
            const ctx = canvas.getContext('2d')

            ctx.fillRect(this.position.x,
                            this.position.y,
                            this.size.w,
                            this.size.h)
        }
    }
}

class Player extends Sprite {
    constructor(canvas, position) {
        const size = {r: 15, s_a: 0, e_a: 2*Math.PI}
        super(canvas, position, size)
        this.size = size
        this.render = this.render.bind(this)
        this.followMouse = this.followMouse.bind(this)
        this.img = new Image()
        this.img.src = "./ovule.svg"
    }

    render() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')
            ctx.drawImage(this.img,
                this.position.x - this.size.r,
                this.position.y - this.size.r)
        }
    }

    followMouse(evt) {
        let position = getMousePos(this.canvas, evt)
        position = {x: position.x - this.size.r,
                    y: position.y - this.size.r,}
        this.position = position
    }
}

class Vilans extends Sprite {
    constructor(canvas, target, position) {
        const size = {r: 3, s_a: 0, e_a: 2*Math.PI}
        super(canvas, position, size)
        this.target = {x: 0, y: 0}
        if (target) this.target = target
        this.diff = {x: 0, y: 0}
        this.velocity = 10

        this.img = new Image()
        this.img.src = "./sperm.svg"

        // Add trace
        this.lastPositions = []
        for (let i = 0; i < 3; i++) {
            this.lastPositions.push(position)
        }

        this.changeDiff = this.changeDiff.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
    }

    changeDiff(evt, r) {
        const mousePosition = getMousePos(this.canvas, evt)
        if (!mousePosition){
            console.log(this.canvas, evt);
            return
        }

        let position = mousePosition
        position = {x: position.x + r,
                    y: position.y + r,}
        this.target = position
    }

    increaseVelocity() {
        this.velocity += 1
    }

    animateTrace(context) {
        context.strokeStyle = 'white';
        context.lineWidth = 3;

        const start = this.lastPositions[0]
        const others = this.lastPositions.slice(1)

        context.moveTo(start.x, start.y);
        for (let i in others) {

            if (i == others.length - 1) break

            const a = others[i]
            const b = others[parseInt(i)+1]
            context.quadraticCurveTo(a.x, a.y, b.x, b.y);
        }
        context.stroke();
    }

    render() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')
            ctx.beginPath()
            ctx.fillStyle = '#FFF'
            ctx.arc(this.position.x, this.position.y,
                this.size.r, this.size.s_a, this.size.e_a)

                // Render tail
            this.animateTrace(ctx)
            ctx.fill()

        }
    }

    addPosition(p) {
        this.lastPositions.pop()
        this.lastPositions.unshift(p)
        console.log(this.lastPositions);
    }

    updatePosition() {
        const errorValue = 8
        const err = {x: getRandInt(-errorValue,errorValue),
                     y: getRandInt(-errorValue,errorValue),}
        let diff = diffPosition(this.target, this.position)
        diff = {x: Math.round(diff.x),
                y: Math.round(diff.y),}
        this.diff = diff

        // get next position using a unit vector
        let mod = vectorMod(this.diff)
        if (!mod) mod = 1
        const pos = {x: (this.diff.x / mod * this.velocity) + err.x,
                     y: (this.diff.y / mod * this.velocity) + err.y,}
        const position = {x: this.position.x + Math.round(pos.x),
                         y: this.position.y + Math.round(pos.y),}
        this.position = position
        this.addPosition(position)
    }
}