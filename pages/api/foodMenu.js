export default async function handler(req, res) {
  const { q } = req.query; 
  try {
    const endpoint = q
      ? `https://dummyjson.com/recipes/search?q=${encodeURIComponent(q)}`
      : "https://dummyjson.com/recipes";

   
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();

   
    res.status(200).json(data.recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
}
