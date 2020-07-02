//  Game Logic & Data

// Data //
let players = [];
let moonRockCount = 0;
let multipliedRate = 0;
let autoIntervalClock = false;
let upgradeItems = {
    shovel: {
        name: "shovel",
        price: 20,
        quantity: 0,
        multiplier: 1,
        upgradeIncrement: 1.3
    },
    drill: {
        name: "drill",
        price: 100,
        quantity: 0,
        multiplier: 5,
        upgradeIncrement: 1.25
    },
    laser: {
        name: "laser",
        price: 400,
        quantity: 0,
        multiplier: 10,
        upgradeIncrement: 1.5
    },
    rover: {
        name: "rover",
        price: 800,
        quantity: 0,
        multiplier: 20,
        upgradeIncrement: 1.75
    }
}
//#region  Game Logic- Sign In/Load

function generateID() {
    return (
        Math.floor(Math.random() * 10000000) +
        "-" +
        Math.floor(Math.random() * 10000000)
    );
}

function signIn(event) {
    event.preventDefault()
    let form = event.target

    let player = {
        id: generateID(),
        name: form.name.value
    }
    if (form.name.value == "") {
        alert("Must Enter Name")
    }
    else {
        players.push(player)
        savePlayer()
    }

    form.reset()
}
function savePlayer() {
    window.localStorage.setItem("player", JSON.stringify(players))
    let playerElem = document.getElementById("player-name")
    let playerName = ""
    players.forEach(player => {
        playerName += `<h3 class="text-white text-center"> Player Name: ${player.name}`
    })
    playerElem.innerHTML = playerName
}
function loadGame() {
    document.getElementById("sign-in").classList.add("hidden")
    document.getElementById("game-play").classList.remove("hidden")
    document.getElementById("stat-card").classList.remove("hidden")
    drawInventory()
}
//#endregion

//#region Game Logic- GamePlay
function mine() {
    if (multipliedRate == 0) {
        moonRockCount++
    }
    else if (multipliedRate > 0) {
        moonRockCount += multipliedRate + 1
        console.log(multipliedRate)
        console.log(`${moonRockCount}`);

    }
    draw()
}

function upgrade(input) {
    let upgradeSelect = upgradeItems[input]
    if (upgradeSelect.price <= moonRockCount) {
        upgradeSelect.quantity++;
        moonRockCount -= upgradeSelect.price
        multipliedRate += upgradeSelect.multiplier
        upgradeSelect.price *= upgradeSelect.upgradeIncrement;

    }

    else {
        alert(`Could not afford, need more moon rocks (${upgradeSelect.price - moonRockCount})`)
    }

    drawInventory()
    drawMRPS()
    draw()
}


function autoMine() {
    for (let key in upgradeItems) {
        if (upgradeItems[key].quantity > 0 && key !== 'shovel') {
            moonRockCount += upgradeItems[key].quantity * upgradeItems[key].multiplier
        }
        draw()
    }
}

function autoInterval() {
    if (autoIntervalClock == false) {
        setInterval(autoMine, 3000);
    }
    else {

    }
}
//#endregion

//#region Game Logic- Drawing
function drawInventory() {
    let inventoryCard = document.getElementById('inventory-card')
    inventoryCard.innerHTML = ''
    inventoryCard.innerHTML += `
           <h3 id="shovel"> ${ upgradeItems.shovel.quantity} </h3>
           <h3 id="drill">${ upgradeItems.drill.quantity} </h3>
           <h3 id="laser">${ upgradeItems.laser.quantity} </h3>
           <h3 id="rover">${ upgradeItems.rover.quantity} </h3>`
}

function drawMRPS() {
    let mrpsCard = document.getElementById("mrps-card")
    mrpsCard.innerHTML = ''
    for (let key in upgradeItems) {
        if (upgradeItems[key].quantity > 0 && key !== 'shovel') {
            mrpsCard.innerHTML += `
            <div> <h3>${upgradeItems[key].name} - ${upgradeItems[key].quantity}: ${Math.floor((upgradeItems[key].multiplier) *
                (upgradeItems[key].quantity) / 3)} MRPS</h3></div>`
        }
    }
}

function drawUpgrades() {
    let upgradesAvailable = document.getElementById("upgrades-available")
    upgradesAvailable.innerHTML = ''
    for (let key in upgradeItems) {
        if (moonRockCount >= 10) {
            upgradesAvailable.innerHTML += `  
                <div class="col- col-sm-4 col-md-6 flex-wrap ">
                <button id="${upgradeItems[key].name}" class="btn btn-warning btn-lg"
                        onclick="upgrade('${key}')">${upgradeItems[key].name}: <br> $ ${Math.floor(Math.ceil(upgradeItems[key].price))}</button></div>`

        }

    }

}

function draw() {
    let clickCountElem = document.getElementById("moon-rock-count")
    let multiplierRate = document.getElementById("multiplier-rate")

    clickCountElem.innerText = Math.floor(moonRockCount)

    multiplierRate.innerText = multipliedRate + 1



    drawUpgrades()
}
draw()
autoInterval()
//#endregion
