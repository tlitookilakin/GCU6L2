function update(index, items) {
    document.getElementById("counter").innerText = index + 1;
    let planet = items[index];

    document.querySelector("#content h2").innerText = planet.name;
    document.querySelector("#content h3").innerText = planet.inner ? "Inner planet" : "Outer planet";

    let planet_display = document.getElementById("planet");
    planet_display.style.backgroundColor = planet.color;
    planet_display.style.transform = `scale(${planet.size / 60})`
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

    let index = 0;

    document.getElementById("prev").addEventListener("click", () => {
        index = (index - 1);
        if (index < 0 ) {
            index = planets.length + (index % planets.length);
        }
        update(index, planets);
    });
    
    document.getElementById("next").addEventListener("click", () => {
        index = (index + 1) % planets.length;
        update(index, planets);
    });

    update(0, planets);
});