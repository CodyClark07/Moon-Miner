//#region Game Logic & Data

// Data //
let moonRockCount = 0


function mine() {
    moonRockCount++
    draw()
}

function draw() {
    let clickCountElem = document.getElementById("moon-rock-count")

    clickCountElem.innerHTML = moonRockCount.toString()
}