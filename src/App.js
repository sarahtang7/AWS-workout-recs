import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Completed from './pages/Completed';
import NewUserForms from './pages/NewUserForms';
import Search from './pages/Search';
import Workout from './pages/Workout';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm) {
      alert('Please enter a search query!');
      return;
    }

    setSearchTerm('');
    const searchPath = `/search?query=${searchTerm}`;
    window.location.assign(searchPath);
  };

  return (
    <div className="App">

    <Router>
      <div id="navlink-header">
        <NavLink activeclassname="active" to="/home">Home</NavLink>
        <NavLink activeclassname="active" to="/favorites">Favorites</NavLink>
        <NavLink activeclassname="active" to="/completed">Completed</NavLink>
        <NavLink activeclassname="active" to="/profile">Profile</NavLink>

        <form id="search-bar" onSubmit={handleSearchSubmit}>
          <input type="text" style={{ height: '30px', width: '250px', fontSize: '15px', marginRight: '5px' }} placeholder="Search" value={searchTerm} onChange={handleSearch} />
          <button type="submit" style={{ height: '30px', fontSize: '15px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>Search</button>
        </form>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route class="navlinks" path="/auth" element={<Login />}></Route>
        <Route class="navlinks" path="/home" element={<Home />}></Route>
        <Route class="navlinks" path="/profile" element={<Profile />}></Route>
        <Route class="navlinks" path="/favorites" element={<Favorites />}></Route>
        <Route class="navlinks" path="/completed" element={<Completed />}></Route>
        <Route class="navlinks" path="/createprofile" element={<NewUserForms />}></Route>
        <Route class="navlinks" path="/search" element={<Search />}></Route>
        <Route path="/workout/:id" element={<Workout />} />
      </Routes>

    </Router>

    </div>
    
  );
}

export default App;
