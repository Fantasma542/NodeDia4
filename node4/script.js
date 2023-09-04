const pokeCard = document.querySelector('[data-poke-card]');
const pokeNombre = document.querySelector('[data-poke-nombre]');
const pokeImagen = document.querySelector('[data-poke-img]');
const pokeContenedorImagen = document.querySelector('[data-poke-img-container]');
const pokeNumero = document.querySelector('[data-poke-id]');
const pokeTipos = document.querySelector('[data-poke-types]');
const pokeEstadisticas = document.querySelector('[data-poke-stats]');

const coloresTipo = {
    eléctrico: '#FFEA70',
    normal: '#B09398',
    fuego: '#FF675C',
    agua: '#0596C7',
    hielo: '#AFEAFD',
    roca: '#999799',
    volador: '#7AE7C7',
    planta: '#4A9681',
    psíquico: '#FFC6D9',
    fantasma: '#561D25',
    bicho: '#A2FAA3',
    veneno: '#795663',
    tierra: '#D2B074',
    dragón: '#DA627D',
    acero: '#1D8A99',
    lucha: '#2F2F2F',
    default: '#2A1A1F',
};

const buscarPokemon = async evento => {
    evento.preventDefault();
    const { value } = evento.target.pokemon;
    
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
        
        if (!respuesta.ok) {
            throw new Error('No se pudo encontrar el Pokémon');
        }
        
        const datos = await respuesta.json();
        renderizarDatosPokemon(datos);
    } catch (error) {
        renderizarNoEncontrado();
    }
}

const renderizarDatosPokemon = datos => {
    const sprite = datos.sprites.front_default;
    const nombre = datos.name;
    const numero = datos.id;
    const tipos = datos.types;
    const estadisticas = datos.stats;

    pokeNombre.textContent = "NOMBRE: " + nombre.toUpperCase();
    
    // Mostrar la imagen del Pokémon.
    pokeImagen.style.display = 'block';
    pokeImagen.setAttribute('src', sprite);
    
    pokeNumero.textContent = "NÚMERO: " + numero;
    renderizarTiposPokemon(tipos);
    renderizarEstadisticasPokemon(estadisticas);
}
const renderizarTiposPokemon = tipos => {
    pokeTipos.innerHTML = '';
    
    for (const tipo of tipos) {
        const nombreTipo = tipo.type.name;
        const elementoTextoTipo = document.createElement("div");
        elementoTextoTipo.textContent = 'TYPE: ' + nombreTipo.toUpperCase();
        pokeTipos.appendChild(elementoTextoTipo);
    }
}

const renderizarEstadisticasPokemon = estadisticas => {
    pokeEstadisticas.innerHTML = '';
    estadisticas.forEach(estadistica => {
        const elementoEstadistica = document.createElement("div");
        const elementoNombreEstadistica = document.createElement("div");
        const elementoValorEstadistica = document.createElement("div");
        elementoNombreEstadistica.textContent = estadistica.stat.name;
        elementoValorEstadistica.textContent = estadistica.base_stat;
        elementoEstadistica.appendChild(elementoNombreEstadistica);
        elementoEstadistica.appendChild(elementoValorEstadistica);
        pokeEstadisticas.appendChild(elementoEstadistica);
    });
}

const renderizarNoEncontrado = () => {
    pokeNombre.textContent = 'No encontrado';
    
    // Ocultar la imagen del Pokémon.
    pokeImagen.style.display = 'none';
    
    pokeContenedorImagen.style.background =  '#fff';
    pokeTipos.innerHTML = '';
    pokeEstadisticas.innerHTML = '';
    pokeNumero.textContent = '';
}