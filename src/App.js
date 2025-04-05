import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Category from "./views/category/Category.jsx";
import Layout from "./Layout.js";
import Product from "./views/product/product.jsx";
import { createContext, useState } from "react";
import Cart from "./views/cart/Cart.jsx";
import Profile from "./views/profile/Profile.jsx";

export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  const request = (url, conf) =>
    new Promise((resolve, reject) => {
      if (url.startsWith("/")) {
        url = "https://localhost:7117" + url;
      }
      if (token) {
        if (!conf) {
          conf = {};
        }
        if (!conf["headers"]) {
          conf.headers = {};
        }
        if (!conf.headers["Authorization"]) {
          conf.headers["Authorization"] = "Bearer " + token;
        }
      }
      fetch(url, conf)
        .then((r) => r.json())
        .then((j) => {
          if (j.status.isSuccess) {
            resolve(j.data);
          } else {
            reject(j);
          }
        });
    });

  return (
    <AppContext.Provider value={{ request, token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
