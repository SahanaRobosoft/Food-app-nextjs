"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">
            Your cart is empty. Add some items to proceed!
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                      priority={true}
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 text-lg font-semibold text-gray-800 flex justify-between">
              <span>Total:</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
