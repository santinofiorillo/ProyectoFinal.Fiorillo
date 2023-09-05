//-----------------------------------------------------------------------------------------------
// Selecciono elementos del HTML por su ID, los asigno y los guardo en variables
//-----------------------------------------------------------------------------------------------
const pokeCard = document.querySelector('#data-poke-card');
const pokeName = document.querySelector('#data-poke-name');
const pokeImg = document.querySelector('#data-poke-img');
const pokeImgContainer = document.querySelector('#data-poke-img-container');
const pokeId = document.querySelector('#data-poke-id');
const pokeTypes = document.querySelector('#data-poke-types');
const pokeStats = document.querySelector('#data-poke-stats');

//-----------------------------------------------------------------------------------------------
// Almacene cada tipo de pokemon en un color que los represente
//-----------------------------------------------------------------------------------------------
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const btn = document.querySelector("#btn");

//-----------------------------------------------------------------------------------------------
// Muestro un mensaje de bienvenida a la pagina
//-----------------------------------------------------------------------------------------------
Swal.fire('Bienvenidos al laboratorio de Pokemon')

// Agrego un evento "submit" al formulario
btn.addEventListener("submit", async function(evt) {
    evt.preventDefault(); // Prevengo el comportamiento del formulario
    await getPokemon(); // Llamo a la función para buscar un Pokémon
});

//-----------------------------------------------------------------------------------------------
// Función para buscar un Pokémon por ID o nombre
//-----------------------------------------------------------------------------------------------
async function getPokemon(id) {
    try {
        const { value } = document.querySelector('[name="pokemon"]');
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
        const data = await res.json();
        renderPokemonData(data); // Mostrar los datos del Pokémon
        localStorage.setItem('lastSearchedPokemon', value.toLowerCase()); // Que quede registrado el ultimo pokemon buscado
    } catch (e) {
        renderNotFound(); // Mostrar el mensaje de "No encontrado"
    }
}

//-----------------------------------------------------------------------------------------------
// Función de error para cuando se escribe mal un pokemon le avise al usuario
//-----------------------------------------------------------------------------------------------
function renderNotFound() {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './img/cruz.png');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    Swal.fire({
        title: 'Pokemon inexistente',
        text: 'Revise que su ID o nombre estén escritos correctamente',
        imageUrl: 'https://clipart-library.com/images_k/pokemon-transparent/pokemon-transparent-24.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'poke-shadow',
    })
}

//-----------------------------------------------------------------------------------------------
// Función para mostrar los datos de un Pokémon
//-----------------------------------------------------------------------------------------------
function renderPokemonData(data) {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types); // Establecer el color de la tarjeta según el tipo de Pokémon
    renderPokemonTypes(types); // Mostrar los tipos de Pokémon
    renderPokemonStats(stats); // Mostrar las estadísticas del Pokémon
}

//-----------------------------------------------------------------------------------------------
// Función para establecer el color de la tarjeta según el tipo de Pokémon
//-----------------------------------------------------------------------------------------------
function setCardColor(types) {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

//-----------------------------------------------------------------------------------------------
// Función para mostrar los tipos de Pokémon
//-----------------------------------------------------------------------------------------------
function renderPokemonTypes(types) {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//-----------------------------------------------------------------------------------------------
// Función para mostrar las estadísticas del Pokémon
//-----------------------------------------------------------------------------------------------
function renderPokemonStats(stats) {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

//-----------------------------------------------------------------------------------------------
// Quise agregar un detalle de que quede registrado el ultimo pokemon buscado, asi utilizaba localstorage, por esa razon esta agregado a lo ultimo
//-----------------------------------------------------------------------------------------------
const lastSearchedPokemon = localStorage.getItem('lastSearchedPokemon');

// Si se encontró un último Pokémon buscado, mostrarlo en el formulario
if (lastSearchedPokemon) {
    document.querySelector('[name="pokemon"]').value = lastSearchedPokemon;
}

// Agregar un evento "submit" al formulario
btn.addEventListener("submit", async function(evt) {
    evt.preventDefault(); 
    await getPokemon();
});

