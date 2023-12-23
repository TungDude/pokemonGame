const interval = setInterval(pokemonGenerator, 10000);
var pokemonName;
var answered;

async function pokemonGenerator() {
    answered = false;
    let id = Math.floor(Math.random() * 1017) + 1;
    let url = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
    const response = await fetch(url);
    const pokemon = await response.json();

    const pokemonContainer = document.getElementById("pokemonContainer");
    let divInner = document.createElement('div');
    let divImg = document.createElement('div');
    let divName = document.createElement('div');
    // let small = document.createElement('small');

    divInner.className = "cards-inner"
    pokemonContainer.innerHTML = "";

    let pokedexNumber = url.slice(34).replace('/', '');

    pokemonName = pokemon['name'].toLowerCase();
    console.log(pokemonName);
    // const capitalizedName = word.charAt(0).toUpperCase() + word.slice(1);

    divImg.innerHTML = "<img class='pokemon-img' src='" + pokemon['sprites']['front_default'] + "'/>";
    divName.innerHTML = "<h4>" + "National Id: " + pokedexNumber + "</h4>";
    // small.innerHTML = "National Id: " + pokedexNumber;
    divInner.appendChild(divImg);
    divInner.appendChild(divName);
    // divInner.appendChild(small);

    pokemonContainer.appendChild(divInner);
}

async function checkAnswer() {
    event.preventDefault();
    var answer = document.getElementById("userAnswer");

    if (answer.value.toLowerCase() == pokemonName && answered == false) {
        answered = true;
        let pointsContainer = document.getElementById("pointsContainer");
        let point_h4 = document.createElement("h3");
        let pointsTag = document.getElementById("points");
        let points = parseInt(pointsTag.innerHTML[pointsTag.innerHTML.length - 1]);

        pointsContainer.innerHTML = "";
        point_h4.innerHTML = "Points: " + (points + 1);
        point_h4.className = "point";
        point_h4.id = "points"
        pointsContainer.appendChild(point_h4);
    }
    answer.value = "";
}

async function Logout() {
    event.preventDefault();
    if (confirm("Are you sure to log out?") == true) {
        window.location.href = "/";
    }
}