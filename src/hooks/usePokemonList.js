import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonList(){
    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
    // const [pokemonList , setPokemonList] = useState([]);
    // const [pokedexUrl ,setPokedexUrl] = useState(DEFAULT_URL);
    // const [nextUrl ,setNextUrl] = useState(DEFAULT_URL);
    // const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);

    // Coverting multiple useState into a single one
    const [pokedexListState , setPokedexListState] = useState({
      pokemonList : [],
      pokedexUrl : DEFAULT_URL,
      nextUrl : DEFAULT_URL,
      prevUrl : DEFAULT_URL
    });

    async function downloadPokemons(){
        const response = await axios.get(pokedexListState.pokedexUrl? pokedexListState.pokedexUrl : DEFAULT_URL);
        const pokemonResults = response.data.results;
       
        const pokemonPromise =  pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonListData = await axios.all(pokemonPromise);
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

    useEffect(()=>{
        downloadPokemons()
    },[pokedexListState.pokedexUrl]);

    return [pokedexListState , setPokedexListState] ;
}
export default usePokemonList
