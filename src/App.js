import React, {useState} from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import MovieIdContext from './Context';
import Player from './components/Player/Player';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';



function App() {
  const [movieId, setMovieId] = useState("")
  return (
    <div className="App">
      <Router>
        <MovieIdContext.Provider value={{movieId,setMovieId}}>
          <Routes>
           <Route path='/amazone-prime-clone' element={<HomeScreen />} />
          </Routes>

          <Routes>
           <Route path='/player' element={<Player />} />
          </Routes>
        </MovieIdContext.Provider>

      </Router>
      
      
    </div>
  );
}

export default App;
