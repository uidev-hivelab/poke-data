import React, { useState } from "react";

const Controls: React.FC = () => {
  //   const { pokemons } = props;
  const [searchText, setSearchText] = useState<string>();

  const onSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="head">
      <h1 className="head-title">POKEMON</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokemon"
          className="input-search"
          value={searchText}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default Controls;
