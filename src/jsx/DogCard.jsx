import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

function DogCard({ dogId }) {
  const [dog, setDog] = useState(null);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/dogs`, [dogId], { withCredentials: true })
      .then((res) => setDog(res.data[0]))
      .catch((err) => console.error("Error fetching dog details", err));
  }, [dogId]);

  if (!dog) return <p>Loading dog...</p>;

  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Zip Code: {dog.zip_code}</p>
    </div>
  );
}

export default DogCard;
