import { useState, useContext } from "react";
import { PokemonsContext } from "context";

export const useHomeLogic = () => {
  const { pokemons, loading } = useContext(PokemonsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 15;
  const searchedElements = pokemons.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = searchedElements.slice(startIndex, endIndex);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return {
    loading,
    searchTerm,
    setSearchTerm,
    searchedElements,
    page,
    setPage,
    currentItems,
    handlePageChange,
    handleSearchChange,
  };
};
