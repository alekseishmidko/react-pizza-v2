import React from "react";
import style from "./SearchStyle.module.scss";
const Search = ({ searchValue, setSearchValue }) => {
  console.log(searchValue, setSearchValue);
  return (
    <div className={style.wrapper}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={style.root}
        type="text"
        placeholder="Поиск..."
      />
      {searchValue && (
        <div onClick={(e) => setSearchValue("")} className={style.img}>
          x
        </div>
      )}
    </div>
  );
};

export default Search;
