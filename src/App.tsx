import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { Pokemons, Pokemon } from "./interface";
import ListPoke from "./components/ListPoke";
import Controls from "./components/Controls";
import Popup from "./components/Popup";
import useDebounce from "./hooks/useDebounce";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchKeyword, setSearchKeyWord] = useState<string>("");
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [id, setId] = useState<number>(-1);
  const [filter, setFilter] = useState<string>("all");

  // use debounce to delay
  const debouncedSearch = useDebounce(searchKeyword, 500);
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    //get data
    const getPokemons = async () => {
      setPokemons([]);
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0"
      );

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(pokemon.url);
        setPokemons((p) => [...p, poke.data]);
      });
    };
    getPokemons();
  }, [debouncedSearch]);

  // search by keyword
  const searchedPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // filter
  const eventCheckType = (element: any) =>
    element.type.name === debouncedFilter;
  const filteredPokemons =
    debouncedFilter === "all"
      ? searchedPokemons
      : searchedPokemons.filter(
          (pokemon) =>
            pokemon.types.some(eventCheckType) &&
            pokemon.types[0].type.name !== "all"
        );

  return (
    <div className={`wrap ${isShow ? "fixed-layout" : ""}`}>
      <div className="container">
        <Controls
          searchKeyword={searchKeyword}
          setSearchKeyWord={setSearchKeyWord}
          filter={filter}
          setFilter={setFilter}
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
