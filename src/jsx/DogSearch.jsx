import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DogCard from "./DogCard";
import useFetchBreeds from "../FetchBreeds";
import { useNavigate } from "react-router-dom";
import DoggoBackground from "./DoggoBackground";
import "../style/DoggoBackground.css";
const BASE_URL = "https://frontend-take-home-service.fetch.com";

function DogSearch() {
  const breeds = useFetchBreeds();
  const [dogs, setDogs] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [sort, setSort] = useState("breed:asc");
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [showAgeFilter, setShowAgeFilter] = useState(false);
  const resetFilters = () => {
    setSelectedBreeds([]);
    setZipCodes("");
    setAgeMin("");
    setAgeMax("");
    setSort("breed:asc");
    setShowAgeFilter(false);
    fetchDogs(null, 1); // refetch dogs with default filters
  };
  const fetchDogs = useCallback(
    async (query = null, page = 1) => {
      try {
        const params = {
          breeds: selectedBreeds,
          zipCodes: zipCodes ? zipCodes.split(",") : undefined,
          ageMin: ageMin || undefined,
          ageMax: ageMax || undefined,
          sort,
          size: 10,
          from: query,
        };

        const response = await axios.get(`${BASE_URL}/dogs/search`, {
          params,
          withCredentials: true,
        });

        setDogs(response.data.resultIds || []);
        setPagination({
          next: response.data.next
            ? response.data.next.replace(/.*from=/, "")
            : null,
          prev: response.data.prev
            ? response.data.prev.replace(/.*from=/, "")
            : null,
        });
        setCurrentPage(page);

        if (response.data.total) {
          setTotalPages(Math.ceil(response.data.total / 10));
        }
      } catch (error) {
        console.error("Failed to fetch dogs", error);
      }
    },
    [selectedBreeds, zipCodes, ageMin, ageMax, sort]
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or session data
    localStorage.removeItem("authToken"); // or cookies/sessionStorage/etc.

    // Redirect to login page
    navigate("/");
  };
  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const visibleCards = windowWidth < 1280 ? 4 : 8;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DoggoBackground>
      <div className="dog-search-container">
        <h2>Search Dogs</h2>

        <div className="layout">
          {/* Sidebar */}
          <div className="sidebar">
            <label>Sort by Breed</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sidebar-select"
            >
              <option value="breed:asc">Breed (A-Z)</option>
              <option value="breed:desc">Breed (Z-A)</option>
              <option value="name:asc">Name (A-Z)</option>
              <option value="name:desc">Name (Z-A)</option>
              <option value="age:asc">Age (Youngest First)</option>
              <option value="age:desc">Age (Oldest First)</option>
            </select>

            <label>Filter by Breed</label>
            <select
              multiple
              onChange={(e) =>
                setSelectedBreeds(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
              className="sidebar-multiselect"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>

            <button
              className="toggle-age-btn"
              onClick={() => setShowAgeFilter(!showAgeFilter)}
            >
              Filter Age
            </button>

            <div className={`age-filter ${showAgeFilter ? "show" : ""}`}>
              <input
                type="number"
                placeholder="Min Age"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Age"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
              />
            </div>

            <input
              className="zip-codes"
              type="text"
              placeholder="Zip Codes (comma-separated)"
              value={zipCodes}
              onChange={(e) => setZipCodes(e.target.value)}
            />
            <button className="reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <h1 className="find-dog">
              {/* Rescue a dog near you, your <i className="fas fa-paw"></i> Pal await */}
              Rescue a dog near you, a furry friend awaits!
              <button
                onClick={handleLogout}
                id="logout"
                className="btn btn-danger"
              >
                Logout
              </button>
            </h1>

            <div className="dogs-list">
              {dogs.slice(0, windowWidth < 1280 ? 4 : 8).map((dogId) => (
                <div key={dogId} className="col-12  ">
                  <DogCard dogId={dogId} />
                </div>
              ))}
            </div>

            <div className="pagination-controls">
              <button
                onClick={() => fetchDogs(pagination.prev, currentPage - 1)}
                disabled={!pagination.prev}
              >
                ⬅ Previous
              </button>
              <span>
                Page {currentPage} {totalPages && `of ${totalPages}`}
              </span>
              <button
                onClick={() => fetchDogs(pagination.next, currentPage + 1)}
                disabled={!pagination.next}
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>
      </div>
    </DoggoBackground>
  );
}

export default DogSearch;
