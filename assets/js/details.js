// Change love button color

function changeColor (lovebutton) {
    lovebutton.classList.toggle('click');
} 

const urlParams = new URLSearchParams(window.location.search);
const idPokemon = urlParams.get('id');

const getPokemonData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const data = await response.json();
    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`);
    const dataSpecies = await responseSpecies.json();

    document.getElementById('pokemon-name').innerText = data.name;
    document.getElementById('pokemon-number').innerText = `#${data.id}`;
    document.getElementById('pokemon-photo').src = data.sprites.other.dream_world.front_default;

    // Tipos 

    const types = data.types.map((type) => `<li>${type.type.name}</li>`).join('');
    document.querySelector('.powers #pokemon-powers').innerHTML = types;

    // Dados adicionais
    const speciesEn = dataSpecies.genera.find(g => g.language.name === 'en');
    document.getElementById('pokemon-species').innerText = speciesEn.genus;
    document.getElementById('pokemon-height').innerText = `${data.height / 10} cm`;
    document.getElementById('pokemon-weight').innerText = `${data.weight / 10} kg`;
    document.getElementById('pokemon-abilities').innerText = data.abilities.map((ability) => ability.ability.name).join(', ');

    document.getElementById('pokemon-egg-groups').innerText = dataSpecies.egg_groups[0].name;

    const tipoPokemon = data.types[0].type.name.toLowerCase();
    document.body.classList.add(tipoPokemon);
};

getPokemonData();
