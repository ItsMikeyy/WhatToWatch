import { useState } from 'react';
import './App.css';

function App() {
  const [checkboxes, setCheckboxes] = useState({
    action: false,
    adventure: false,
    animation: false,
    comedy: false,
    crime: false,
    documentary: false,
    drama: false,
    family: false,
    fantasy: false,
    history: false,
    horror: false,
    music: false,
    mystery: false,
    scifi: false,
    sport: false,
    thriller: false,
    war: false,
    western: false,
    
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedValues = Object.keys(checkboxes).filter(key => checkboxes[key]);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({options: selectedValues})
      });

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.log("Error")
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const {name, checked} = e.target;
    setCheckboxes(prev => ({
      ...prev,
      [name]: checked,
    }));
  }


  return (
    <form onSubmit={handleSubmit}>
      <label for="action">Action</label>
      <input name="action" onChange={handleChange} value="action" type="checkbox" />
      
      <label for="adventure">Adventure</label>
      <input name="adventure" onChange={handleChange} value="adventure" type="checkbox" />

      <label for="animation">Animation</label>
      <input name="animation" onChange={handleChange} value="animation" type="checkbox" />

      <label for="comedy">Comedy</label>
      <input name="comedy" onChange={handleChange} value="comedy" type="checkbox" />

      <label for="crime">Crime</label>
      <input name="crime" onChange={handleChange} value="crime" type="checkbox" />

      <label for="documentary">Documentary</label>
      <input name="documentary" onChange={handleChange} value="documentary" type="checkbox" />

      <label for="drama">Drama</label>
      <input name="drama" onChange={handleChange} value="drama" type="checkbox" />

      <label for="family">Family</label>
      <input name="family" onChange={handleChange} value="family" type="checkbox" />

      <label for="fantasy">Fantasy</label>
      <input name="fantasy" onChange={handleChange} value="fantasy" type="checkbox" />

      <label for="history">History</label>
      <input name="history" onChange={handleChange} value="history" type="checkbox" />

      <label for="horror">Horror</label>
      <input name="horror" onChange={handleChange} value="horror" type="checkbox" />

      <label for="music">Music</label>
      <input name="music" onChange={handleChange}value="music" type="checkbox" />

      <label for="mystery">Mystery</label>
      <input name="mystery" onChange={handleChange} value="mystery" type="checkbox" />

      <label for="romance">Romance</label>
      <input name="romance" onChange={handleChange} value="romance" type="checkbox" />

      <label for="scifi">Sci-Fi</label>
      <input name="scifi" onChange={handleChange} value="scifi" type="checkbox" />

      <label for="sport">Sport</label>
      <input name="sport" onChange={handleChange} value="sport" type="checkbox" />

      <label for="thriller">Thriller</label>
      <input name="thriller" onChange={handleChange} value="thriller" type="checkbox" />

      <label for="war">War</label>
      <input name="war" onChange={handleChange} value="war" type="checkbox" />

      <label for="western">Western</label>
      <input name="western" onChange={handleChange} value="western" type="checkbox" />

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
