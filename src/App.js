import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./componets/PokemonThumbnail";

function App() {

  const [allPokemon, setAllPokemon] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemon = async() => {
    const res = await fetch(loadMore)      // use axios
    const data = await res.json()

    setLoadMore(data.next);
  
    function createPokemonObject (result) {
      result.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemon( currentList => [...currentList, data]);
      });
    };

    createPokemonObject(data.results);
    await console.log(allPokemon)
  };
  
  useEffect(() => {
    getAllPokemon()
  }, [])

  return (
    <div className="app-container">
      <h1>Pokedex </h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemon.map((pokemonStats, index) => 
            <PokemonThumbnail
              key={index}
              id={pokemonStats.id}
              name={pokemonStats.name} 
              image={pokemonStats.sprites.other.dream_world.front_default}
              type={pokemonStats.types[0].type.name} // add other types!
            />)}

        </div>
        <button className="load-more"> Load more</button>
      </div>
    </div>
  );
}

export default App;