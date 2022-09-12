import React from "react";
import { Pokemon } from "../interface";

interface Props {
  pokemons: Pokemon[];
  setId: React.Dispatch<React.SetStateAction<number>>;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPoke: React.FC<Props> = (props) => {
  const { pokemons, setId, isShow, setIsShow } = props;

  const handleClick = (id: number) => {
    if (isShow) {
      setId(-1);
    } else {
      setId(id);
    }
    setIsShow(!isShow);
  };

  return (
    <div className="list">
      {pokemons.map((poke) => {
        return (
          <div
            className="card"
            key={poke.id}
            onClick={() => {
              handleClick(poke.id);
            }}
          >
            <div className="thumb">
              <span className="id">#{poke.id}</span>
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="img"
              />
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
