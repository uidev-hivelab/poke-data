import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { Pokemons, Pokemon } from "./interface";
import ListPoke from "./components/ListPoke";
import Controls from "./components/Controls";
import Popup from "./components/Popup";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchKeyword, setSearchKeyWord] = useState<string>("");
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [id, setId] = useState<number>(1);

  useEffect(() => {
    //get data
    const getPokemons = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
      );

      res.data.results.forEach(async (pokemon: Pokemons) => {
        setPokemons([]);
        const poke = await axios.get(pokemon.url);
        setPokemons((p) => [...p, poke.data]);
      });
    };
    getPokemons();
  }, [searchKeyword]);

  // search by keyword
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="wrap">
      <div className="container">
        <Controls
          searchKeyword={searchKeyword}
          setSearchKeyWord={setSearchKeyWord}
        />
        <ListPoke
          pokemons={filteredPokemons}
          setId={setId}
          isShow={isShow}
          setIsShow={setIsShow}
        />
      </div>

      <div
        className={`dimmed ${isShow ? "is-show" : ""}`}
        onClick={() => setIsShow(false)}
      ></div>
      <Popup isShow={isShow} id={id}></Popup>
    </div>
  );
};

export default App;
