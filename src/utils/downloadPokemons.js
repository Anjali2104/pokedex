import axios from "axios";

async function downloadPokemons(pokedexListState , setPokedexListState , defaultUrl, limit=20){
    const response = await axios.get(pokedexListState.pokedexUrl? pokedexListState.pokedexUrl : defaultUrl);
    let pokemonResults = response.data.results ? response.data.results: response.data.pokemon ;
    pokemonResults = pokemonResults.slice(0,limit);
    const pokemonPromise =  pokemonResults.map((p) => {
        if(p.url){
          return  axios.get(p.url);
        }
        else if(p.pokemon.url){
            return axios.get(p.pokemon.url);
        }   
    });

    const pokemonListData = await axios.all(pokemonPromise);
    console.log(pokemonListData);
    const pokemonFinalList = pokemonListData.map((pokemonData) => {
        const pokemon = pokemonData.data;
        return {
            id : pokemon.id,
            name : pokemon.name,
            image : pokemon.sprites.other.dream_world.front_default,
            types : pokemon.types
        }
    })
    // setPokemonList(pokemonFinalList);
    setPokedexListState(( {...pokedexListState, pokemonList: pokemonFinalList,  nextUrl : response.data.next , prevUrl:response.data.prev}));
}

export default downloadPokemons;