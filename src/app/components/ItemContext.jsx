const { createContext, useState, useContext } = require("react");

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};
export const useItem = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error("useItem must be used within an ItemProvider");
    }
    return context;
};
