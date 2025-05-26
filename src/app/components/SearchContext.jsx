const { createContext, useState, useContext } = require("react");

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchResults = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchResults must be used within a SearchProvider");
  }
  return context;
};
