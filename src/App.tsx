import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import { Pokemons, Pokemon } from "./interface";
import ListPoke from "./components/ListPoke";
import Controls from "./components/Controls";
import Popup from "./components/Popup";
import useDebounce from "./hooks/useDebounce";

const App: React.FC = () => {
  const [scroll, setScroll] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchKeyword, setSearchKeyWord] = useState<string>("");
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [id, setId] = useState<number>(-1);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  // use debounce to delay
  const debouncedSearch = useDebounce(searchKeyword, 500);
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    //get data
    const getPokemons = async () => {
      setPokemons([]);
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=230"
      );

      setTimeout(() => {
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(pokemon.url);
          setPokemons((p) => [...p, poke.data]);
        });
      }, 1000);
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

  // overflow body
  if (isShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "initial";
  }

  return (
    <div className={`wrap`}>
      <Controls
        searchKeyword={searchKeyword}
        setSearchKeyWord={setSearchKeyWord}
        filter={filter}
        setFilter={setFilter}
        scroll={scroll}
      />
      <ListPoke
        pokemons={filteredPokemons}
        setId={setId}
        isShow={isShow}
        setIsShow={setIsShow}
      />

      <button
        type="button"
        className={`btn btn-top ${scroll ? "is-show" : ""}`}
        onClick={() =>
          window.scrollTo({
            top: 0,
          })
        }
      ></button>
      <div
        className={`dimmed ${isShow ? "is-show" : ""}`}
        onClick={() => setIsShow(false)}
      ></div>
      <Popup isShow={isShow} setIsShow={setIsShow} id={id}></Popup>
    </div>
  );
};

export default App;
