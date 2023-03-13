import React from "react";
import style from "./SearchStyle.module.scss";
import debounce from "lodash.debounce";

// импорт компонента который нужен для создания контекста. Для того чтобы не передавать данные из компонента в компонент
import { SearchContext } from "../../App";
const Search = () => {
  const onClickCross = () => {
    setSearchValue("");
    setLocalSearch("");
    //  правильгный способ обращения к дом елементам
    inputRef.current.focus();
  };
  const [localSearch, setLocalSearch] = React.useState("");
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    []
  );
  const onChangeInput = (event) => {
    setLocalSearch(event.target.value);
    updateSearchValue(event.target.value);
  };
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={style.wrapper}>
      <input
        ref={inputRef}
        value={localSearch}
        onChange={onChangeInput}
        className={style.root}
        type="text"
        placeholder="Поиск..."
      />
      {localSearch && (
        <div onClick={onClickCross} className={style.img}>
          x
        </div>
      )}
    </div>
  );
};

export default Search;
