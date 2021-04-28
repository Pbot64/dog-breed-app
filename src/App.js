import React, { useState, useEffect } from "react";
import axios from "axios";

import { Search } from "./components/Search";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [breedsWithImages, setBreedsWithImages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const onMount = () => {
      const getBreeds = async () => {
        try {
          const {
            data: { message: allBreeds }
          } = await axios.get("https://dog.ceo/api/breeds/list/all");
          setBreeds(Object.keys(allBreeds));
        } catch (err) {
          console.log("err", err);
        }
      };
      getBreeds();
    };
    onMount();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      const promises = breeds.map(breed => {
        return new Promise((res, rej) => {
          axios
            .get(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then(s => res({ breed, images: s.data.message }))
            .catch(s => rej(s));
        });
      });
      const allBreedsWithImages = await Promise.all(promises);
      setBreedsWithImages(allBreedsWithImages);
    };
    getImages();
  }, [breeds]);

  const breedFilterOnChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App">
      <Search
        inputValue={inputValue}
        breedFilterOnChange={breedFilterOnChange}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {breedsWithImages
          .filter(s =>
            s.breed.toLowerCase().startsWith(inputValue.toLowerCase())
          )
          .map(breedImage => (
            <div key={breedImage.breed}>
              <img
                width={150}
                height={150}
                src={breedImage.images}
                alt={breedImage.breed}
              />

              <div
                style={{
                  padding: "0 0px",
                  margin: "5px 5px",
                  transform: "translate(-5px, -25px)",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,.5)",
                  color: "white"
                }}
              >
                {breedImage.breed}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
