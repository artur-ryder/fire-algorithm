let data = []
const rows = 30, cols = 30;
const canvas = document.getElementById("canvas")
let maxFireIntensity = 30;
let fireIntensity = maxFireIntensity;
const colors = [
    {"r": 0, "g": 0, "b": 0},
    {"r": 10, "g": 0, "b": 0},
    {"r": 15, "g": 5, "b": 0},
    {"r": 30, "g": 10, "b": 0},
    {"r": 45, "g": 15, "b": 0},
    {"r": 60, "g": 20, "b": 0},
    {"r": 75, "g": 25, "b": 0},
    {"r": 90, "g": 30, "b": 0},
    {"r": 105, "g": 35, "b": 0},
    {"r": 120, "g": 40, "b": 0},
    {"r": 135, "g": 45, "b": 0},
    {"r": 150, "g": 50, "b": 0},
    {"r": 165, "g": 55, "b": 10},
    {"r": 180, "g": 65, "b": 20},
    {"r": 195, "g": 75, "b": 30},
    {"r": 210, "g": 85, "b": 40},
    {"r": 225, "g": 95, "b": 50},
    {"r": 240, "g": 105, "b": 60},
    {"r": 255, "g": 115, "b": 70},
    {"r": 255, "g": 130, "b": 80},
    {"r": 255, "g": 145, "b": 90},
    {"r": 255, "g": 160, "b": 100},
    {"r": 255, "g": 175, "b": 110},
    {"r": 255, "g": 190, "b": 120},
    {"r": 255, "g": 205, "b": 130},
    {"r": 255, "g": 220, "b": 140},
    {"r": 255, "g": 230, "b": 160},
    {"r": 255, "g": 240, "b": 180},
    {"r": 255, "g": 245, "b": 200},
    {"r": 255, "g": 250, "b": 225},
    {"r": 255, "g": 255, "b": 255}
]

const increaseFire = document.getElementById("increaseFire")
const decreaseFire = document.getElementById("decreaseFire")

increaseFire.addEventListener('click', () => {
    fireIntensity = fireIntensity + 5 > maxFireIntensity ? maxFireIntensity : fireIntensity + 5
    createFireSource()
})
decreaseFire.addEventListener('click', () => {
    fireIntensity = fireIntensity - 5 > 0 ? fireIntensity - 5 : 0
    createFireSource()
})


function start() {
    createFireStructure();
    createFireSource();
    renderFire();

    setInterval(animate, 50)
}

function animate() {
    calculateFirePropagation()
    renderFire()
}

start()

function createFireStructure() {
    const dataSize = rows * cols
    for ( let i = 0; i < dataSize; i++){
        data[i] = 0
    }

    console.log("Data Structure created!")
    console.log(data)
}

function createFireSource(){
    const finalPos = data.length - 1;
    for (let col = finalPos; col > finalPos - cols; col--){
        data[col] = fireIntensity
    }
}

function calculatePixelDecay(col) {
    const decay = Math.round(Math.random() * 3)

    data[col] = data[col + cols] - decay >= 0 ? data[col + cols] - decay : 0
}

function calculateFirePropagation() {
    const finalPos = ( data.length - 1 ) - cols;

    for( let col = 0; col <= finalPos; col ++) {
        calculatePixelDecay(col) 
    }
}

function renderFire() {
    let html = "<table>"

    for ( let col = 0; col < rows; col++){
        html += "<tr>"

        for (let row = 0; row < cols; row++) {

            const actualValue = data[row + col * cols]
            const color = colors[actualValue]

            html += `<td style="background-color: rgb(${color.r},${color.g},${color.b})"></td>` 
        }

        html += "</tr>"
    }

    html += "</table>"   

    canvas.innerHTML = html
}

