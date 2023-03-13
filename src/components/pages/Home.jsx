import React from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryIndex,
  setSortIndex,
  setPageCount,
} from "../../redux/slices/FilterSlice";
import { SearchContext } from "../../App";
import Sort from "../Sort/Sort";
import Categories from "../Categories/Categories";
import Card from "../Card/Card";
import Skeleton from "../Card/Skeleton";
import Pagination from "../Pagination/Pagination";
const Home = () => {
  const dispatch = useDispatch();
  // редакс  фильтр по  категориям
  const categoryIndex = useSelector((state) => state.FilterSlice.categoryIndex);
  const onClickCategory = (id) => {
    // передать задание на изменение состояния
    dispatch(setCategoryIndex(id));
  };
  const sortIndex = useSelector((state) => state.FilterSlice.sortIndex);
  const { searchValue } = React.useContext(SearchContext);
  // стейт карточек изначально пустой, карточки загружаются с бекенда
  const [items, setItems] = React.useState([]);
  //   состояние загрузки карточек, изначально правда тк загружается
  const [loading, setLoading] = React.useState(true);

  // cтейт для текущей страницы(пагинация)
  const currentPage = useSelector((state) => state.FilterSlice.pageCount);
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };
  const order = sortIndex.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortIndex.sortProperty.replace("-", " ");
  const category = categoryIndex > 0 ? `category=${categoryIndex}` : "";
  const search = searchValue ? ` &search = ${searchValue}` : "";
  React.useEffect(() => {
    axios
      .get(
        `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((resp) => {
        setItems(resp.data);
        setLoading(!loading);
        // автоматический страницы скролл наверх при каждом переходе на нее
        window.scrollTo(0, 0);
      });
  }, [categoryIndex, sortIndex, searchValue, currentPage]);

  // вынес в отдельные переменные рендер компонентов. скелетон рендерит пустой массив пока loading не изменит состояние после получения ответа с бекенда.
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <Card key={obj.id} {...obj} />);
  return (
    <div>
      <div className="content__top">
        {/*  добавляю стейты(для категорий и сортировки ) в соответствующие компоненты чтобы использовать их внутри них */}
        <Categories
          categoryIndex={categoryIndex}
          onClickCategory={onClickCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? // сначала прогружается скелетон, потом карточка товара
            skeleton
          : pizzas}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

{
  /* <Sort setSortIndex={setSortIndex} sortIndex={sortIndex} /> */
}
