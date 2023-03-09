import "./scss/app.scss";
import React, { useState } from "react";
import Header from "./components/Header/Header";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import { Routes, Route } from "react-router-dom";
function App() {
  //стейт со значением в инпуте( по умолчанию ничего)
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
