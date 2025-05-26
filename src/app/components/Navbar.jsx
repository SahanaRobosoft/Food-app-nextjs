import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useSearchResults } from "./SearchContext";
import { useItem } from "./ItemContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchResults } = useSearchResults();
  const { cart } = useCart();
  const { items } = useItem();
  const cartItemCount = cart.length;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await fetch(
          `/api/foodMenu?q=${encodeURIComponent(searchTerm)}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        const processedData = data.map((recipe, index) => ({
          id: recipe.id,
          name: recipe.name,  
          price: Math.floor(Math.random() * 20) + 5, 
          image: recipe.image, 
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          cuisine: recipe.cuisine,
          caloriesPerServing: recipe.caloriesPerServing,
          tags: recipe.tags,
          rating: recipe.rating,
          reviewCount: recipe.reviewCount,
        }));
        setSearchResults(processedData); 
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults(items);
    }
  }, [searchTerm]);
  return (
    <nav className="sticky top-0 bg-white shadow-md max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">Food App</Link>
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 pr-10 text-gray-800"
            onChange={(e) => handleSearchChange(e)}
            value={searchTerm}
            onKeyDown={handleKeyDown}
          />
          <FiSearch
            onClick={() => handleSearch(searchTerm)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
          />
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Home
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-blue-500 transition flex items-center"
          >
            <FiShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
