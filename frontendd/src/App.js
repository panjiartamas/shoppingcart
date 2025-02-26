import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import CardContent from "./components/ui/CardContent";
import "./App.css";

const API_URL = "http://localhost:5000/api/products";

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => setProducts(response.data));
  }, []);

  return (
    <div className="shop-container">
      <h1 className="title">Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <Card key={product._id} className="product-card">
            <CardContent>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2 className="title">Cart</h2>
      <ul className="cart-list">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <li key={index} className="cart-item">{item.name} - ${item.price}</li>
          ))
        )}
      </ul>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app-container">
      <Shop addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
