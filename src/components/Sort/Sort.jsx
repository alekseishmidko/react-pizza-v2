import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortIndex } from "../../redux/slices/FilterSlice";
const Sort = () => {
  //   cтейт состояния окна сортировки( по умолч. ложь те закрыто, при клике меняется на правду )
  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef();
  const list = [
    { name: "популярности(+)", sortProperty: "rating" },
    { name: "популярности(-)", sortProperty: "-rating" },
    { name: "цене(+)", sortProperty: "price" },
    { name: "цене(-)", sortProperty: "-price" },
    { name: "алфавиту(+)", sortProperty: "title" },
    { name: "алфавиту(-)", sortProperty: "-title" },
  ];
  const dispatch = useDispatch();
  const sortIndex = useSelector((state) => state.FilterSlice.sortIndex);
  // редакс сортировка
  // const sortIndex = useSelector((state) => state.FilterSlice.sortIndex);

  const onClickSort = (i) => {
    dispatch(setSortIndex(i));
    // после выбора новой сортировки, состояние окна меняется на фолс чтобы окно закрылось
    setOpen(false);
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // если клик прошел по области вне компонента сорт, то всплывающее окно закроется
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
        console.log("object");
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          {/* при клике на сортировку изменится стейт состояния на противоположный (по дефолту ложь)  и откроется окно сортировки*/}
          <span onClick={() => setOpen(!open)}>{sortIndex.name}</span>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {/* отрисовываю элементы массива  */}
              {list.map((item, i) => (
                <li
                  key={i}
                  onClick={() => onClickSort(item)}
                  className={
                    sortIndex.sortProperty === item.sortProperty ? "active" : ""
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
