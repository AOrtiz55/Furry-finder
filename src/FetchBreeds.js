import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

function FetchBreeds() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/dogs/breeds`, { withCredentials: true })
      .then((res) => setBreeds(res.data))
      .catch((err) => console.error("Error fetching breeds", err));
  }, []);

  return breeds;
}

export default FetchBreeds;
