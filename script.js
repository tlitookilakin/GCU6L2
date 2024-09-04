function updatePlanetDisplay(index, items) {
    document.getElementById("counter").innerText = index + 1;
    let planet = items[index];

    document.querySelector("#content h2").innerText = planet.name;
    document.querySelector("#content p").innerText = planet.inner ? "Inner planet" : "Outer planet";

    let planet_display = document.getElementById("planet");
    planet_display.style.backgroundColor = planet.color;
    planet_display.style.transform = `scale(${planet.size / 100})`

    if (!getWrappingEnabled()) {
        document.getElementById("prev").disabled = (index === 0);
        document.getElementById("next").disabled = (index === (items.length - 1));
    }
    else {
        document.getElementById("prev").disabled = false;
        document.getElementById("next").disabled = false;
    }
}

function getAverageDiameter(items) {
    let sum = 0;
    for (let item of items) {
        sum += item.size;
    }
    return sum / items.length;
}

function getLargestPlanet(items) {
    let largest = null;
    for (let item of items) {
        if (!largest || item.size > largest.size)
            largest = item;
    }
    return largest;
}

function getWrappingEnabled() {
    return document.getElementById("wrapEnabled").checked;
}

function populatePlanets(items) {
    let list = document.getElementById("planetnames");
    for (let item of items) {
        let el = document.createElement("li");
        el.innerText = item.name;
        list.appendChild(el);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let planets = [
        {name: "Mercury", inner: true, size: 3031.9, color: "#696969"},
        {name: "Venus", inner: true, size: 7520.8, color: "#b89165"},
        {name: "Earth", inner: true, size: 7917.5, color: "#5a5b86"},
        {name: "Mars", inner: true, size: 4212.3, color: "#df8c4e"},
        {name: "Jupiter", inner: false, size: 86881, color: "#f6a049"},
        {name: "Saturn", inner: false, size: 72367, color: "#dcd3a1"},
        {name: "Uranus", inner: false, size: 31518, color: "#b4d9df"},
        {name: "Neptune", inner: false, size: 30599, color : "#456eff"}
    ];

    planets.forEach(n => console.log(n.name));
    let avg = getAverageDiameter(planets);
    console.log(avg);
    
    document.getElementById("avgdiam").innerText = `Average diameter: ${avg}`;
    document.getElementById("largestdiam").innerText = `Largest planet: ${getLargestPlanet(planets).name}`;
    populatePlanets(planets);

    let index = 0;

    document.getElementById("prev").addEventListener("click", () => {
        index = (index - 1);
        if (index < 0 ) {
            index = planets.length + (index % planets.length);
        }
        updatePlanetDisplay(index, planets);
    });
    
    document.getElementById("next").addEventListener("click", () => {
        index = (index + 1) % planets.length;
        updatePlanetDisplay(index, planets);
    });

    document.getElementById("wrapEnabled").addEventListener("change", () => updatePlanetDisplay(index, planets));
    updatePlanetDisplay(0, planets);
});