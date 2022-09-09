import React from "react";
import { Pokemon } from "../interface";

interface Props {
  pokemons: Pokemon[];
}

const ListPoke: React.FC<Props> = (props) => {
  const { pokemons } = props;

  return (
    <div className="list">
      {pokemons.map((poke) => {
        return (
          <div className="card" key={poke.id}>
            <div className="thumb">
              <span className="id">#{poke.id}</span>
              {/* <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="img"
              /> */}
            </div>
            <div className="content">
              <div className="types">
                {poke.types.map((poke, index) => {
                  return (
                    <span className={`type ` + poke.type.name} key={index}>
                      {poke.type.name}
                    </span>
                  );
                })}
              </div>
              <strong className="name">{poke.name}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListPoke;
