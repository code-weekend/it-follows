
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
        const size = {r: 40, s_a: 0, e_a: 2*Math.PI}
        super(canvas, position, size)

        this.render = this.render.bind(this)
        this.followMouse = this.followMouse.bind(this)
    }

    render() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')

            ctx.beginPath();
            ctx.arc(this.position.x,
                    this.position.y,
                    this.size.r,
                    this.size.s_a,
                    this.size.e_a);
            ctx.stroke();
        }
    }

    followMouse(evt) {
        this.position = getMousePos(this.canvas, evt)
    }
}

class Vilans extends Sprite {
    constructor(canvas, target, position) {
        const size = {r: 5, s_a: 0, e_a: 2*Math.PI}
        super(canvas, position, size)
        this.target = {x: 0, y: 0}
        if (target) this.target = target
        this.diff = {x: 0, y: 0}
        this.velocity = 10
        this.changeDiff = this.changeDiff.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
    }

    changeDiff(evt) {
        console.log(evt);
        const mousePosition = getMousePos(this.canvas, evt)
        if (!mousePosition){
            console.log(this.canvas, evt);
            return
        }
        this.target = mousePosition
        // console.log(this.target);
        // this.updatePosition()
    }

    increaseVelocity() {
        this.velocity += 3
    }

    render() {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')

            ctx.beginPath();
            ctx.arc(this.position.x,
                    this.position.y,
                    this.size.r,
                    this.size.s_a,
                    this.size.e_a);
            ctx.fill();
            ctx.stroke();
        }
    }

    updatePosition() {
        const err = {x: getRandInt(-5,5),
                     y: getRandInt(-5,5),}
        let diff = diffPosition(this.target, this.position)
        diff = {x: Math.round(diff.x),
                y: Math.round(diff.y),}
        if (Math.abs(diff.x) < 10 && Math.abs(diff.y) < 10) return
        this.diff = diff

        // get next position using a unit vector
        let mod = Math.sqrt(this.diff.x**2 + this.diff.y**2)
        if (!mod) mod = 1
        const pos = {x: (this.diff.x / mod * this.velocity) + err.x,
                     y: (this.diff.y / mod * this.velocity) + err.y,}
        const position = {x: this.position.x + Math.round(pos.x),
                         y: this.position.y + Math.round(pos.y),}
        this.position = position
    }
}