from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Dummy data for products
products = [
    {"id": 1, "name": "Laptop", "price": 800, "description": "High performance laptop.", "img": "https://via.placeholder.com/150/0000FF/FFFFFF?text=Laptop"},
    {"id": 2, "name": "Smartphone", "price": 500, "description": "Latest model smartphone.", "img": "https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartphone"},
    {"id": 3, "name": "Headphones", "price": 50, "description": "Noise-cancelling headphones.", "img": "https://via.placeholder.com/150/00FF00/FFFFFF?text=Headphones"},
    {"id": 4, "name": "Smartwatch", "price": 200, "description": "Fitness tracking smartwatch.", "img": "https://via.placeholder.com/150/FFFF00/000000?text=Smartwatch"},
    {"id": 5, "name": "Tablet", "price": 300, "description": "Portable tablet for reading and browsing.", "img": "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Tablet"},
    {"id": 6, "name": "Bluetooth Speaker", "price": 100, "description": "Wireless Bluetooth speaker.", "img": "https://via.placeholder.com/150/00FFFF/000000?text=Bluetooth+Speaker"},
    {"id": 7, "name": "Gaming Console", "price": 400, "description": "Next-gen gaming console.", "img": "https://via.placeholder.com/150/FF8800/FFFFFF?text=Gaming+Console"},
    {"id": 8, "name": "Camera", "price": 600, "description": "High-resolution digital camera.", "img": "https://via.placeholder.com/150/888888/FFFFFF?text=Camera"}
]


# In-memory cart (stored on the server for simplicity)
cart = {}

# Route to get all products
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products), 200

# Route to get cart details
@app.route('/cart', methods=['GET'])
def get_cart():
    return jsonify(cart), 200

# Route to add item to cart
@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    # Validate product existence
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Add or update the item in the cart
    if product_id in cart:
        cart[product_id]["quantity"] += quantity
    else:
        cart[product_id] = {
            "name": product["name"],
            "price": product["price"],
            "quantity": quantity,
        }

    return jsonify(cart), 201

# Route to update item quantity
@app.route('/cart/<int:product_id>', methods=['PUT'])
def update_cart(product_id):
    data = request.json
    quantity = data.get('quantity')

    if product_id not in cart:
        return jsonify({"error": "Product not in cart"}), 404

    if quantity <= 0:
        del cart[product_id]  # Remove item if quantity is zero or less
    else:
        cart[product_id]["quantity"] = quantity

    return jsonify(cart), 200

# Route to remove item from cart
@app.route('/cart/<int:product_id>', methods=['DELETE'])
def remove_from_cart(product_id):
    if product_id in cart:
        del cart[product_id]
        return jsonify(cart), 200

    return jsonify({"error": "Product not in cart"}), 404

# Main entry point
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
