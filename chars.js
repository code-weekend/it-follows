
// Classes
class Sprite {
    constructor(canvas, position, size) {
        this.position = {x: 0, y: 0}
        this.size = {h: 20, w: 20}
        if (position) this.position = position
        if (size) this.size = size
        if (canvas) this.canvas = canvas

        console.log(this);

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
        const size = {r: 1, s_a: 0, e_a: 2*Math.PI}
        super(canvas, position, size)
        this.target = {x: 0, y: 0}
        if (target) this.target = target
        this.diff = {x: 0, y: 0}
        this.velocity = 10

        this.img = new Image()
        this.img.src = "./spem.svg"

        this.changeDiff = this.changeDiff.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
    }

    changeDiff(evt, r) {
        console.log(evt);
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
        this.size.r += 1
    }

    render() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')

            ctx.drawImage(this.img,
                this.position.x - this.img.width / 2,
                this.position.y - this.img.height / 2)
        }
    }

    updatePosition() {
        const err = {x: getRandInt(-5,5),
                     y: getRandInt(-5,5),}
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
    }
}