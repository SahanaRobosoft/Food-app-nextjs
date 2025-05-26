"use client";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";

const FoodItem = ({ item }) => {
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    console.log("Item added to cart:", item, "Quantity:", quantity);
  };
  useEffect(() => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cart, item.id]);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
      <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        className="w-full h-40 object-cover rounded-md mb-4"
        priority={true}
      />

      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
      <div className="mt-2 flex items-center">
        <label htmlFor={`quantity-${item.id}`} className="text-gray-600 mr-2">
          Quantity:
        </label>
        <input
          type="number"
          id={`quantity-${item.id}`}
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="border rounded px-2 py-1 w-16 text-center"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
        <Link
          key={item.id}
          href={{
            pathname: `/recipe/${item.id}`,
          }}
        >
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;
