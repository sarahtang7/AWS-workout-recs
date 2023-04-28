import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import WorkoutPreferencesForm from './pages/WorkoutPreferencesForm';
import UserProfileInput from './pages/UserProfileInput';

function App() {
  return (
    <div className="App">

      <Router>
        <div id="navlink-header">
          <NavLink activeClassName="active" to="/home">Home</NavLink>
        </div>

        <Routes>
          <Route class="navlinks" path="/" element={<Login />}></Route>
          <Route class="navlinks" path="/home" element={<Home />}></Route>
          <Route class="navlinks" path="/quiz" element={<WorkoutPreferencesForm />}></Route>
          <Route class="navlinks" path="/createprofile" element={<UserProfileInput />}></Route>
        </Routes>

      </Router>

    </div>
  );
}

export default App;
