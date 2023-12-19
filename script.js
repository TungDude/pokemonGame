const interval = setInterval(pokemonGenerator(), 1000);

async function pokemonGenerator() {
    let id = Math.floor(Math.random() * 1017) + 1;
    let url = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
    const response = await fetch(url);
    const pokemon = await response.json();
    console.log(pokemon);

    const pokemonContainer = document.getElementById("pokemonContainer");
    let divInner = document.createElement('div');
    let divImg = document.createElement('div');
    let divName = document.createElement('div');
    let small = document.createElement('small');

    divInner.className = "cards-inner"

    let pokedexNumber = url.slice(34).replace('/', '');

    const word = pokemon['name'];
    const capitalizedName = word.charAt(0).toUpperCase() + word.slice(1);

    divImg.innerHTML = "<img src='" + pokemon['sprites']['front_default'] + "'/>";
    divName.innerHTML = "<h4>" + capitalizedName + "</h4>";
    small.innerHTML = "National Id: " + pokedexNumber;
    divInner.appendChild(divImg);
    divInner.appendChild(divName);
    divInner.appendChild(small);

    pokemonContainer.appendChild(divInner);
}