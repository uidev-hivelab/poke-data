import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { Pokemon } from "./interface";
import ListPoke from "./components/ListPoke";
import Controls from "./components/Controls";

interface Pokemons {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchKeyword, setSearchKeyWord] = useState<string>("");

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0"
      );
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(pokemon.url);
        setPokemons((p) => [...p, poke.data]);
      });
    };
    getPokemons();
  }, []);

  const onSearch = (keyword: string) => {
    setSearchKeyWord(keyword);
  };

  return (
    <div className="wrap">
      <div className="container">
        <Controls onSearch={onSearch} />
        <ListPoke pokemons={pokemons} />
      </div>
    </div>
  );
};

export default App;
