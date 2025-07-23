import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import { Search } from "lucide-react";

const Searched = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === "") return setResults([]);

    const fetchSearch = async () => {
      try {
        const res = await axiosInstance.get(
          `/image/serchImage?query=${searchQuery}`
        );
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching search", err.message);
      }
    };
    fetchSearch();
  }, [search]);
  return (
    <div>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search for free photos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none text-lg"
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => dispatch(serchImage(searchQuery))}
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
      <ul>
        {results.map((item) => (
          <Link key={item._id}>
            <div>{item.title}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Searched;
