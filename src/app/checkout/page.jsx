"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [message, setMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const router = useRouter();

  const handlePayment = (e) => {
    e.preventDefault();
    setMessage("Payment successful! Thank you for your order.");
    clearCart();
    setTimeout(() => router.push("/"), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleGoBack = () => {
    router.back(); 
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Checkout
        </h1>
        <button
          onClick={handleGoBack}
          className="mb-4 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          View Orders
        </button>
        <form onSubmit={handlePayment} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Payment Details
          </h2>
          <div>
            <label htmlFor="cardNumber" className="block text-gray-600 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2 text-gray-800 "
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="expiryDate" className="block text-gray-600 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 text-gray-800 "
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-gray-600 mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2 text-gray-800 "
                placeholder="123"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Pay ${total.toFixed(2)}
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.startsWith("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
