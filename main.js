const loaderContainer = document.querySelector(".loader-container");
const pokeTable = document.getElementById("poke-table");
const pokedex = document.getElementById("pokedex");
var pokemon = [];

function showLoader() {
    loaderContainer.style.display = "block";
}

function hideLoader() {
    loaderContainer.style.display = "none";
}

function toggleImages() {
    const img1 = document.getElementById("pokeImg1");
    const img2 = document.getElementById("pokeImg2");

    img2.style.display = "none";

    setInterval(() => {
        if(img1.style.display === "none") {
            img1.style.display = "block";
            img2.style.display = "none"
        } else {
            img2.style.display = "block"
            img1.style.display = "none"
        }
    }, 2000);
}

function renderPokedex(index) {
    pokedex.innerHTML = /*html*/ `
    <div class="screen">
        <img id="pokeImg1" src="${pokemon[index].info.sprites.front_default}" alt="" />
        <img id="pokeImg2" src="${pokemon[index].info.sprites.back_default}" alt="" />
        <p class="description">
            Altura: ${pokemon[index].info.height}
            <br />
            Peso: ${pokemon[index].info.weight}
        </p>
    </div>
    <div class="info">
        <h3 class="name">${pokemon[index].info.name}</h3>
    </div>
    `

    toggleImages();
}

function renderTable() {
    pokemon.forEach((pokemon, index) => {
        pokeTable.innerHTML += /*html*/ `
        <tr onClick="renderPokedex('${index}')">
            <td>${index + 1}</td>
            <td>${pokemon.name}</td>
            <td><img src='${pokemon.info.sprites.front_default}' /></td>
        </tr>
        `
    })
}


async function fetchPokemon() {
    showLoader();

    const pokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon");

    pokemon = await Promise.all(
        pokemonResponse.data.results.map(async (pokemon) => {
            const infoResponse = await axios.get(pokemon.url);
            pokemon.info = infoResponse.data;
            return pokemon;
        })
     );

    renderTable();

    hideLoader();
}

fetchPokemon();