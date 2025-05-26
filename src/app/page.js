"use client";
import { useEffect, useState } from "react";
import FoodItem from "./components/FoodItem";
import { useItem } from "./components/ItemContext";
import { useSearchResults } from "./components/SearchContext";

const HomePage = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchResults } = useSearchResults();
  const { setItems } = useItem();
  const fetchFoodMenu = async () => {
    try {
      const response = await fetch("/api/foodMenu");
      if (!response.ok) {
        throw new Error("Failed to fetch food menu");
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

      setFoodMenu(processedData);
      setItems(processedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoodMenu();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Menu
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-gray-700">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((item) => <FoodItem key={item.id} item={item} />)
          ) : foodMenu && foodMenu.length > 0 ? (
            foodMenu.map((item) => <FoodItem key={item.id} item={item} />)
          ) : (
            <p className="text-center text-gray-600">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
