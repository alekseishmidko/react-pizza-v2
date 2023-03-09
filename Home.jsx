import React from "react";

import Sort from "../Sort/Sort";
import Categories from "../Categories/Categories";
import Card from "../Card/Card";
import Skeleton from "../Card/Skeleton";

const Home = () => {
  // стейт карточек изначально пустой, карточки загружаются с бекенда
  const [items, setItems] = React.useState([]);
  //   состояние загрузки карточек, изначально правда тк загружается
  const [loading, setLoading] = React.useState(true);
  //   создаю глобальный стейт для значений индексов  категорий и сортировки товаров( useContext)
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const [sortIndex, setSortIndex] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  //   функция которая меняет стейт категорий внутри компонента категорий товара, объявлена здесь и через пропсы передана в компонент
  const onClickCategory = (i) => {
    setCategoryIndex(i);
  };

  const order = sortIndex.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortIndex.sortProperty.replace("-", " ");
  const category = categoryIndex > 0 ? `category=${categoryIndex}` : "";
  React.useEffect(() => {
    fetch(
      `https://63e3ba61c919fe386c0d7fe5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setLoading(!loading);
        // автоматический страницы скролл наверх при каждом переходе на нее
        window.scrollTo(0, 0);
      });
  }, [categoryIndex, sortIndex]);
  return (
    <div>
      <div className="content__top">
        {/*  добавляю стейты(для категорий и сортировки ) в соответствующие компоненты чтобы использовать их внутри них */}
        <Categories
          categoryIndex={categoryIndex}
          //   setCategoryIndex={setCategoryIndex}
          onClickCategory={onClickCategory}
        />
        <Sort
          setSortIndex={setSortIndex}
          sortIndex={sortIndex}
          //   onClickSort={onClickSort}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? // сначала прогружается скелетон, потом карточка товара
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <Card key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
