import axios from 'axios';
import './PokemonList.css'
import { useEffect, useState } from 'react';
import Pokemon from '../Pokemon/Pokemon';

const PokemonList = () => {
    const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
    // const [pokemonList , setPokemonList] = useState([]);
    // const [pokedexUrl ,setPokedexUrl] = useState(DEFAULT_URL);
    // const [nextUrl ,setNextUrl] = useState(DEFAULT_URL);
    // const [prevUrl, setPrevUrl] = useState(DEFAULT_URL);
    const [pokedexListState , setPokedexListState] = useState({
      pokemonList : [],
      pokedexUrl : DEFAULT_URL,
      nextUrl : DEFAULT_URL,
      prevUrl : DEFAULT_URL
    });

    async function downloadPokemons(){
        const response = await axios.get(pokedexListState.pokedexUrl? pokedexListState.pokedexUrl : DEFAULT_URL);
        const pokemonResults = response.data.results;
        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);
        // setPokedexListState((state) => ({...state, nextUrl : response.data.next , prevUrl:response.data.prev}));
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

  return (
    <div className='pokemonList-wrapper'>
      <div> <h1>Pokemon list</h1></div>
      <div className='page-controls'>
        <button onClick={() =>setPokedexListState({...pokedexListState, pokedexUrl:pokedexListState.prevUrl})}>Prev</button>
        <button onClick={() => setPokedexListState({...pokedexListState,pokedexUrl:[pokedexListState.nextUrl]})}>Next</button>
      </div>
      <div className='pokemon-list'>
      {
        pokedexListState.pokemonList.map((pokemon) => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} id={pokemon.id} />)
      }
      </div>
    </div>
  )
}

export default PokemonList
