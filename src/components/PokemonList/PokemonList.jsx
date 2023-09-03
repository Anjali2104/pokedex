
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from '../../hooks/usePokemonList';

const PokemonList = () => {
   const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
   const [pokedexListState,setPokedexListState] = usePokemonList( DEFAULT_URL);

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
