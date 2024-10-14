import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Fetch cart from backend
  const fetchCart = () => {
    axios.get('http://127.0.0.1:5000/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error(error));
  };

  // Add item to cart
  const addToCart = (productId) => {
    axios.post('http://127.0.0.1:5000/cart', { product_id: productId, quantity: 1 })
      .then(fetchCart)
      .catch(error => console.error(error));
  };

  // Update item quantity in cart
  const updateCart = (productId, quantity) => {
    axios.put(`http://127.0.0.1:5000/cart/${productId}`, { quantity })
      .then(fetchCart)
      .catch(error => console.error(error));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    axios.delete(`http://127.0.0.1:5000/cart/${productId}`)
      .then(fetchCart)
      .catch(error => console.error(error));
  };

  return (
    <>
      <Navbar></Navbar>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />
      <Footer></Footer>
    </>
  );
}

export default App;
