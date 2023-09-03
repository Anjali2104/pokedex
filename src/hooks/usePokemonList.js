
import { useEffect, useState } from "react";
import downloadPokemons from "../utils/downloadPokemons";


function usePokemonList(DEFAULT_URL){
   

    // Coverting multiple useState into a single one
    const [pokedexListState , setPokedexListState] = useState({
      pokemonList : [],
      pokedexUrl : DEFAULT_URL,
      nextUrl : DEFAULT_URL,
      prevUrl : DEFAULT_URL
    });


    useEffect(()=>{
        downloadPokemons( pokedexListState , setPokedexListState , DEFAULT_URL)
    },[pokedexListState.pokedexUrl]);

    return [pokedexListState , setPokedexListState] ;
}
export default usePokemonList
