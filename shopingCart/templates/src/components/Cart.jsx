import React from 'react';

function Cart({ cart, updateCart, removeFromCart }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul className="bg-white rounded-lg shadow-md">
        {Object.entries(cart).length === 0 ? (
          <li className="p-4 text-center text-gray-500">Your cart is empty.</li>
        ) : (
          Object.entries(cart).map(([id, item]) => (
            <li key={id} className="flex justify-between items-center border-b py-4 px-6">
              <div>
                <span className="font-semibold">{item.name}</span> - 
                <span className="font-bold text-gray-800">${item.price}</span> x 
                <span className="font-bold">{item.quantity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => updateCart(parseInt(id), item.quantity + 1)} 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                >
                  +
                </button>
                <button 
                  onClick={() => updateCart(parseInt(id), Math.max(item.quantity - 1, 0))} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  -
                </button>
                <button 
                  onClick={() => removeFromCart(parseInt(id))} 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Cart;
