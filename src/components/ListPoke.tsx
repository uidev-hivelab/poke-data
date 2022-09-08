import React from "react";
import { Pokemon } from "../interface";

interface Props {
  pokemons: Pokemon[];
}

const ListPoke: React.FC<Props> = (props) => {
  const { pokemons } = props;
  const typePoke: (arr: any) => string = (arr) => {
    let classType = "";
    return arr.map((item: string) => {
      classType += item;
    });
  };
  return (
    <div className="list">
      {pokemons.map((poke) => {
        return (
          <div className="card" key={poke.id}>
            <div className="thumb">
              <span className="id">#{poke.id}</span>
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="img"
              />
            </div>
            <div className="content">
              {/* {`type ` + poke.types[0].type.name} */}
              <span className={`type ` + typePoke}>
                {poke.types[0].type.name}
              </span>
              <strong className="name">{poke.name}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListPoke;
