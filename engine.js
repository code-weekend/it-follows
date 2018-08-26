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
        this.listVilains.map(i => i.changeDiff(evt))
    }

    updateLabels() {
        var ctx = this.canvas.getContext("2d");
        ctx.font = "20px Arial";
        ctx.fillText(`Enemies: ${this.listVilains.length}`, 50, 50);
        ctx.fillText(`Time: ${this.counter/1000}s`, 200, 50);
        ctx.fillText(`Max. Vel: ${this.listVilains
            .map(i => i.velocity)
            .reduce((acc, cur) => acc > cur ? acc : cur)}m/s`, 350, 50);
    }

    randomPosition() {
        return {x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,}
    }

    createVilain() {
        this.listVilains.push(new Vilans(this.canvas, this.player.position, this.randomPosition()))
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
    }
}
