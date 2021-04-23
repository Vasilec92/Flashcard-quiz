import { useState, useEffect } from "react";
import FlashcardList from "./components/FlashcardList";
import "./App.css";

function App() {
  const [num, setNum] = useState(10);
  const [catg, setCatg] = useState(22);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState({});

  async function fetchCards() {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${num}&category=${catg}`
    );
    const data = await response.json();
    setData(data.results);
  }
  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    }
    fetchCategory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCards();
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" onChange={(e) => setCatg(e.target.value)}>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            onChange={(e) => setNum(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        {data.length > 0 && <FlashcardList flashcards={data} />}
      </div>
    </>
  );
}

export default App;
