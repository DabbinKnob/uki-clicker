let gem = document.querySelector('.gem-cost')
let parseGem = parseFloat(gem.innerHTML)

let gpcText = document.getElementById("gpc-text")
let gpsText = document.getElementById("gps-text")

let gemImgContainer = document.querySelector('.gem-img-container')

let gpc = 1;

let gps = 0;

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parseCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parseIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        gemMultiplier: 1.05,
        costMultiplier: 1.4,
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parseCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector('.pickaxe-increase'),
        parseIncrease: parseFloat(document.querySelector('.pickaxe-increase').innerHTML),
        level: document.querySelector('.pickaxe-level'),
        gemMultiplier: 1.15,
        costMultiplier: 1.4,
    },
    {
        name: 'mine-hub',
        cost: document.querySelector('.mine-hub-cost'),
        parseCost: parseFloat(document.querySelector('.mine-hub-cost').innerHTML),
        increase: document.querySelector('.mine-hub-increase'),
        parseIncrease: parseFloat(document.querySelector('.mine-hub-increase').innerHTML),
        level: document.querySelector('.mine-hub-level'),
        gemMultiplier: 1.20,
        costMultiplier: 1.3,
    },
    {
        name: 'wheel-of-fate',
        cost: document.querySelector('.wheel-of-fate-cost'),
        parseCost: parseFloat(document.querySelector('.wheel-of-fate-cost').innerHTML),
        increase: document.querySelector('.wheel-of-fate-increase'),
        parseIncrease: parseFloat(document.querySelector('.wheel-of-fate-increase').innerHTML),
        level: document.querySelector('.wheel-of-fate-level'),
        gemMultiplier: 15.5,
        costMultiplier: 1.5,
    },
    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        parseCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector('.miner-increase'),
        parseIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
        level: document.querySelector('.miner-level'),
        gemMultiplier: 1.1,
        costMultiplier: 10.5,
    },
]

function incrementGem(event) {
    gem.innerHTML = Math.round(parseGem += gpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement("div")
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    gemImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 500)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    if (parseGem >= mu.parseCost) {
        gem.innerHTML = Math.round(parseGem -= mu.parseCost);

        mu.level.innerHTML ++

        mu.parseIncrease = parseFloat((mu.parseIncrease * mu.gemMultiplier).toFixed(2))
        mu.increase.innerHTML = mu.parseIncrease

        mu.parseCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parseCost)

        if (mu.name === 'clicker') {
            gpc += mu.parseIncrease
        } else if (mu.name === 'miner') {
            gpc += mu.parseIncrease * 2
            gps += mu.parseIncrease
        } else if (mu.name === 'wheel-of-fate') {
            parseGem += Math.random() * mu.parseIncrease * mu.gemMultiplier
        }  else {
            gps += mu.parseIncrease
        }
    }
}

function save() {
    localStorage.clear()

    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parseLevel: parseFloat(upgrade.level.innerHTML),
            parseCost: upgrade.parseCost,
            parseIncrease: upgrade.parseIncrease
        })

        localStorage.setItem(upgrade.name, obj)

    })

    localStorage.setItem('gpc', JSON.stringify(gpc))
    localStorage.setItem('gps', JSON.stringify(gps))
    localStorage.setItem('gem', JSON.stringify(parseGem))
}

function load() {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.parseCost = savedValues.parseCost
        upgrade.parseIncrease = savedValues.parseIncrease

        upgrade.level.innerHTML = savedValues.parseLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parseCost)
        upgrade.increase.innerHTML = upgrade.parseIncrease
    })

    gpc = JSON.parse(localStorage.getItem('gpc'))
    gps = JSON.parse(localStorage.getItem('gps'))
    parseGem = JSON.parse(localStorage.getItem('gem'))
    
    gem.innerHTML = Math.round(parseGem)
}

setInterval(() => {
    parseGem += gps / 10
    gem.innerHTML = Math.round(parseGem)
    gpcText.innerHTML = Math.round(gpc)
    gpsText.innerHTML = Math.round(gps);
}, 100);