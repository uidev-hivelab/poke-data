import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Pokemon } from "../interface";

interface Props {
  isShow: boolean;
  id: number;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<Props> = (props) => {
  const { isShow, setIsShow, id } = props;
  const [pokemons, setPokemons] = useState<Pokemon>();

  useEffect(() => {
    //get data
    const getPokemon = async () => {
      const res: Pokemon = (
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      ).data;
      setPokemons(res);
    };

    if (id > 0) {
      getPokemon();
    }
  }, [id]);

  return (
    <div className={`layer ${isShow ? "is-show" : ""}`}>
      <div className="inner">
        <div className="header">
          <h2 className="name">
            #{pokemons?.id} - {pokemons?.name}
          </h2>
          <button
            type="button"
            className="btn btn-close"
            onClick={() => setIsShow(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="content">
          <div className="group group-thumb">
            <div className="thumb">
              {id > 0 ? (
                <img
                  src={
                    pokemons?.sprites.other["official-artwork"].front_default
                  }
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <div className="group group-info">
            <ul className="info">
              <li className="item">
                <p className="key">Height</p>
                <p className="value">{pokemons?.height}</p>
              </li>
              <li className="item">
                <p className="key">Category</p>
                <p className="value">Updating...</p>
              </li>
              <li className="item">
                <p className="key">Weight</p>
                <p className="value">{pokemons?.weight}</p>
              </li>
              <li className="item">
                <p className="key">Gender</p>
                <p className="value">Updating...</p>
              </li>
              <li className="item">
                <p className="key">Abilities</p>
                <p className="value">Updating...</p>
              </li>
            </ul>
            <div className="group-small">
              <h3 className="title">Type</h3>
              <div className="types">
                {pokemons?.types.map((poke, index) => {
                  return (
                    <span className={`type ` + poke.type.name} key={index}>
                      {poke.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="group-small">
              <h3 className="title">Weaknesses</h3>
              <div className="types">Updating...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
