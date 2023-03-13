import React from "react";

const Categories = ({ categoryIndex, onClickCategory }) => {
  // const [activeCategory, setActiveCategory] = React.useState(0);
  // const setCategory = (i) => {
  //   setActiveCategory(i);
  // };
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((value, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryIndex === index ? "active" : ""}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
