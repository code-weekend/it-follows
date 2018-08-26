class Enginee {
    constructor(tick) {
        this.canvas = document.getElementById('canvas')
        this.player = new Player(this.canvas)

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

    createVilain() {
        const position = {x: Math.random() * canvas.width,
                          y: Math.random() * canvas.height,}
        this.listVilains.push(new Vilans(this.canvas, this.player.position, position))
    }

    render() {
        this.counter += this.tick
        console.log(`Times: ${this.counter/1000}s`)
        this.listVilains.map(i => i.updatePosition())

        // Add vilain
        if (this.counter % 1000 === 0) {
            this.createVilain()
            this.listVilains.map(i => i.increaseVelocity())
        }

        this.clear()

        this.player.render()
        this.listVilains.map(i => i.render())
    }
}
