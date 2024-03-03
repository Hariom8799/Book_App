import { useState,useEffect} from 'react'
import './App.css'
import Loading from './component/Loading';

function App() {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
      fetchRandomBook();
    }, []);

    const fetchRandomBook = async() => {
      setLoading(true);
      const url = 'https://books-api7.p.rapidapi.com/books/get/random/';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '2ee669a25fmsh801721c89613ff2p112783jsn21d23344bee9',
          'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setBook(result);
        setLoading(false);
        console.log(result);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const handleNextBook = () => {
      fetchRandomBook();
    };

    const handlePreviousBook = () => {
      fetchRandomBook();
    };

  return (
    <div className="App">
      <h1>Kitaabghar</h1>
      {loading ? (
        <Loading/>
      ) : (
        
        <div className="book-container">
          <img src={book.cover} alt="Book cover" />
          <div className="book-details">
            <h2>{book.title}</h2>
            <p><span>Author:</span> {book.author.first_name}</p>
            <p><span>Genre:</span> {book.genres.join()}</p>
            <p><span>Number of Pages:</span> {book.pages}</p>
          </div>
          <div className="buttons">
            <button onClick={handlePreviousBook}>Previous</button>
            <button onClick={handleNextBook}>Next</button>
          </div>
        </div>
        
      )}
    </div>
  )
}

export default App
