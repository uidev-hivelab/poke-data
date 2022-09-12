import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

const types = [
  "electric",
  "normal",
  "fire",
  "grass",
  "poison",
  "ice",
  "water",
  "psychic",
  "rock",
  "bug",
  "fairy",
  "fighting",
  "flying",
  "ground",
  "steel",
  "ghost",
  "dark",
];

interface Props {
  searchKeyword: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Controls: React.FC<Props> = (props) => {
  const { searchKeyword, setSearchKeyWord, filter, setFilter } = props;
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onclick = (e) => {
      if (
        (e.target as HTMLTextAreaElement).contains(boxRef.current) &&
        e.target !== boxRef.current
      ) {
        setIsShow(false);
      }
    };
  });

  const handleSelect = (type: string) => {
    setIsShow(false);
    if (type === filter) {
      setFilter("all");
    } else {
      setFilter(type);
    }
  };

  return (
    <div className="head">
      <h1 className="head-title">POKEMON</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokemon"
          className="input-search"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyWord((e.target as HTMLInputElement).value);
          }}
        />
        <div className={`filter ${isShow ? "is-show" : ""}`} ref={boxRef}>
          <button
            type="button"
            className="option option-selected"
            onClick={() => setIsShow(!isShow)}
          >
            {filter}
            <FontAwesomeIcon icon={faChevronDown} className="ic ic-arrow" />
          </button>
          <ul className="options">
            {types.map((item) => {
              return (
                <li
                  className={`option ${item === filter ? "selected" : ""}`}
                  key={item}
                  onClick={() => {
                    handleSelect(item);
                  }}
                >
                  <span>{item}</span>
                  {item === filter ? (
                    <FontAwesomeIcon icon={faCheck} className="ic ic-checked" />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Controls;
