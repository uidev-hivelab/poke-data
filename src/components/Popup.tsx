import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

import { Pokemon } from "../interface";

interface Props {
  isShow: boolean;
  id: number;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<Props> = (props) => {
  const { isShow, setIsShow, id } = props;
  const [pokemons, setPokemons] = useState<Pokemon>();
  const [about, setAbout] = useState<any>();
  const [gender, setGender] = useState<number>(1);

  useEffect(() => {
    setPokemons(undefined);
    //get data by id
    const getPokemon = async () => {
      const res: Pokemon = (
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      ).data;
      setPokemons(res);
    };
    const getAbout = async () => {
      const resAbout = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      setAbout(resAbout.data.flavor_text_entries);
      setGender(resAbout.data.gender_rate);
    };
    if (id > 0) {
      getPokemon();
      getAbout();
    }
  }, [id]);

  return (
    <div className={`layer ${isShow ? "is-show" : ""}`}>
      <div className="layer-inner">
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
            <div className={`thumb ${pokemons ? "" : "is_loading"}`}>
              {pokemons?.sprites.other["official-artwork"].front_default ? (
                <img
                  src={
                    pokemons?.sprites.other["official-artwork"].front_default
                  }
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <div className="group group-overview">
            <ul className="info">
              <li className="item">
                <p className="key">Height:</p>
                <p className="value">{pokemons?.height}</p>
              </li>
              <li className="item">
                <p className="key">Category:</p>
                <p className="value">Updating...</p>
              </li>
              <li className="item">
                <p className="key">Weight:</p>
                <p className="value">{pokemons?.weight}</p>
              </li>
              <li className="item">
                <p className="key">Gender:</p>
                <p className="value">
                  {gender < 0 ? (
                    "Unknown"
                  ) : gender === 0 ? (
                    <FontAwesomeIcon icon={faMars} />
                  ) : gender < 8 ? (
                    <>
                      <FontAwesomeIcon icon={faMars} />
                      &nbsp;
                      <FontAwesomeIcon icon={faVenus} />
                    </>
                  ) : (
                    <FontAwesomeIcon icon={faVenus} />
                  )}
                </p>
              </li>
              <li className="item">
                <p className="key">Abilities:</p>
                <p className="value">Updating...</p>
              </li>
              <li className="item item-about">
                <p className="key">About:</p>
                <p className="value">
                  {about !== undefined ? about[4].flavor_text : ""}
                </p>
                <p className="value">
                  {about !== undefined ? about[5].flavor_text : ""}
                </p>
              </li>
            </ul>
          </div>
          <div className="group group-info">
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
              <p className="value">Updating...</p>
            </div>
          </div>
          <div className="group group-stats">
            <h3 className="title">Stats</h3>
            <ul className="stats">
              {pokemons?.stats.map((poke, index) => {
                return (
                  <li className="item" key={index}>
                    <ul className="gauge">
                      <li
                        className="meter"
                        style={{
                          top: (150 - poke.base_stat) * 0.5 - 1.111 + "%",
                        }}
                      ></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <span className="gauge-text">
                      {poke.stat.name.split("-").join(" ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
