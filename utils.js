// Functions
function getMousePos(canvas, evt) {
    if (!evt) return
    var rect = canvas.getBoundingClientRect();
    return {x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,};
}

const diffPosition = (p1, p2) => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y,
})

const start = (p1, p2) => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y,
})

const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}