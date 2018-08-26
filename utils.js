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


const getRandInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const vectorMod = (vector)=> Math.sqrt(vector.x**2 + vector.y**2)

const getRotation = (p1, p2)=>{
    let hipotenusa = diffPosition(p1,p2)
    let modHipo = vectorMod(hipotenusa)
    let modCatY = p1.y - p2.y
    let modCatX = p1.x - p2.x
    let seno = (modCatY / modHipo)
    let cosseno = (modCatX / modHipo)
    let angule
    if(seno){
        angule = Math.asin(seno)

    }else{
        angule = Math.acos(cosseno)
    }
    console.log(angule);
}
