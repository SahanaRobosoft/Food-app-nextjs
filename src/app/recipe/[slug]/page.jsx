"use client";
import { useCart } from "@/app/components/CartContext";
import { useItem } from "@/app/components/ItemContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecipeDetails = ({ params }) => {
  const { items } = useItem();
  const { addToCart } = useCart();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;  
      const recipeId = parseInt(unwrappedParams.slug);


      const filteredRecipe = items.find((item) => item.id === recipeId);
      setRecipe(filteredRecipe);
    }

    unwrapParams();
  }, [params, items]);

  if (!recipe) {
    return <p>Recipe not found. Please go back and select a valid recipe.</p>;
  }

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    addToCart(recipe, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" mx-auto bg-white  p-6">
        <button
          onClick={handleBack}
          className="mb-4 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          Back
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={300}
            height={300}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
            <p className="text-gray-600 mt-4">{recipe.description}</p>
            <p className="text-lg font-semibold text-gray-800 mt-4">
              Rating: {recipe.rating} ({recipe.reviewCount} reviews)
            </p>
            <p className="text-gray-600 mt-2">
              Prep Time: {recipe.prepTimeMinutes} mins | Cook Time:{" "}
              {recipe.cookTimeMinutes} mins
            </p>
            <p className="text-gray-600 mt-2">Servings: {recipe.servings}</p>
            <p className="text-gray-600 mt-2">
              Difficulty: {recipe.difficulty}
            </p>
            <p className="text-gray-600 mt-2">
              Calories per Serving: {recipe.caloriesPerServing}
            </p>
            <div className="mt-4 flex items-center">
              <label htmlFor="quantity" className="text-gray-600 mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="border rounded px-2 py-1 w-16 text-center text-gray-600"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Instructions</h2>
          <ol className="list-decimal list-inside mt-2 text-gray-600">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Tags Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">Tags</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
