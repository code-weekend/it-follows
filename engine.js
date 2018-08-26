class Enginee {
    constructor(tick) {
        this.canvas = document.getElementById('canvas')
        this.player = new Player(this.canvas, this.randomPosition())

        this.listVilains = []

        this.tick = tick
        this.counter = 0

        this.events = this.events.bind(this)
        this.render = this.render.bind(this)

        // const ctx = this.canvas.getContext()
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear() {
        if (this.canvas.getContext) {
            const ctx = canvas.getContext('2d')

            ctx.clearRect(0, 0,
                        canvas.width,
                        canvas.height)
        }
    }

    events(evt) {
        this.player.followMouse(evt)
        this.listVilains.map(i => i.changeDiff(evt, this.player.size.r))
    }

    checkColision() {
        const pos  = {x: this.player.position.x + this.player.size.r,
                      y: this.player.position.y + this.player.size.r,}
        const colision = this.listVilains
            .map(i => diffPosition(i.position, pos))
            .map(i => vectorMod(i))
            .reduce((acc, cur) => cur < this.player.size.r + 10 || acc, false)
        console.log(colision);

        return colision
    }

    updateLabels() {
        var ctx = this.canvas.getContext("2d");
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Spermatozoids: ${this.listVilains.length}`, 50, 50);
        ctx.fillText(`Time: ${this.counter/1000}s`, 250, 50);
        ctx.fillText(`Max. Vel: ${this.listVilains
            .map(i => i.velocity)
            .reduce((acc, cur) => acc > cur ? acc : cur)}nm/s`, 400, 50);
    }

    randomPosition() {
        return {x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,}
    }

    createVilain() {
        const pos  = {x: this.player.position.x + this.player.size.r,
                      y: this.player.position.y + this.player.size.r,}
        this.listVilains.push(new Vilans(this.canvas, pos, this.randomPosition()))
    }

    interval(int) {
        this.interval = int
    }

    render() {
        this.counter += this.tick
        // console.log(`Times: ${this.counter/1000}s`)
        this.listVilains.map(i => i.updatePosition())

        // Add vilain
        if (this.counter % 1000 === 0) {
            this.listVilains.map(i => i.increaseVelocity())
            this.createVilain()
        }

        this.clear()

        this.player.render()
        this.listVilains.map(i => i.render())
        this.updateLabels()

        // colision check
        if (this.checkColision()) {
            clearInterval(this.interval)
            setTimeout(() => alert("Congratz, you'll be a father :)"), 1)
        }
    }
}
