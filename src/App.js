import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">

      <Router>
        <div id="navlink-header">
          <NavLink activeClassName="active" to="/home">Home</NavLink>
        </div>

        <Routes>
          <Route class="navlinks" path="/" element={<Home />}></Route>
        </Routes>

      </Router>

    </div>
  );
}

export default App;
