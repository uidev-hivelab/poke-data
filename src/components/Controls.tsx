import React from "react";

interface Props {
  searchKeyword: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
}

const Controls: React.FC<Props> = (props) => {
  const { searchKeyword, setSearchKeyWord } = props;

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
      </div>
    </div>
  );
};

export default Controls;
