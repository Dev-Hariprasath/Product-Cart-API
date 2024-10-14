import React from 'react';

function ProductList({ products, addToCart }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li key={product.id} className="border rounded-lg shadow-lg p-4 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
            
            <div className="text-center">
                <img
                src={`https://via.placeholder.com/150?text=${product.name}`} // Placeholder image
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 border-b-2 border-gray-200"/>
                <h2 className="text-lg font-bold">{product.name}</h2>
            </div>
            <div className="flex flex-col justify-between items-start mb-4">
              <b className="text-xl font-semibold text-gray-700">{product.name}</b>
              <p className="text-xl font-semibold text-gray-700">{product.description}</p> {/* Changed to <p> for better semantics */}
              <span className="text-gray-800 font-bold text-lg">${product.price}</span>
            </div>
            <button
              onClick={() => addToCart(product.id)}
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
