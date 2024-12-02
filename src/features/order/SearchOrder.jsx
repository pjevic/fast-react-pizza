/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    console.log("There is a query");
    navigate(`/order/${query}`);
    console.log("Navigation is successful");
    setQuery("");
    console.log("Qery is reseted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order #"
      />
    </form>
  );
}

export default SearchOrder;
