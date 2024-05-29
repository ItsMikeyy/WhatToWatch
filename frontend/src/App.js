import { useState } from 'react';
import MovieCard from './Components/MovieCard';
import Header from './Components/Header';
import "./App.css"
function App() {

  const [requestData, setRequestData] = useState({})
  const [titleType, setTitleType] = useState("feature")
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState({
    d1: "",
    d2: "",
    d3: "",
  })

  const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History",
  "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedValues = Object.values(genre);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({options: selectedValues, type: titleType})
      });

      if (response.ok) {
        const data = await response.json()
        setRequestData(data.data)
        setLoading(false);      
      } else {
        console.log("Error")
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  const getFilteredOptions = (currentDropdown) => {
    const selected = Object.values(genre).filter(
      (val) => val !== '' && val !== genre[currentDropdown]
    );
    return genres.filter((g) => !selected.includes(g));
  };

  const handleTitleType = (e) => {
    setTitleType(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h1 className="primary-text">I want to watch a:</h1>
            <select onChange={handleTitleType} className="primary_select">
              <option value="feature">Movie</option>
              <option value="tv_series">TV Show</option>
              <option value="feature,tv_series">Movie or TV Show</option>
            </select>
          </div>
          <br />
          <div className="container">
            <h1 className="primary-text">With genres consisting of:</h1>
            <select className="primary_select" name="d1" onChange={handleChange} value={genre.d1}>
              <option value="">None</option>
              {getFilteredOptions('d1').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <h1 className="primary-text">And</h1>
            <select className="primary_select" name="d2" onChange={handleChange} value={genre.d2}>
            <option value="">None</option>
              {getFilteredOptions('d2').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <h1 className="primary-text">And</h1>
            <select className="primary_select" name="d3" onChange={handleChange} value={genre.d3}>
            <option value="">None</option>
              {getFilteredOptions('d3').map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="container">
            <button type="submit" className="primary-button">GO</button>
          </div>
          <br />
          {Object.keys(requestData).length !== 0 && <MovieCard name={requestData.title} img={requestData.img} description={requestData.description} link={requestData.link}/>}
        </form>
        {loading && <h2 className='primary-text'>Loading...</h2>}
      </div>
    </>
  );
}

export default App;
