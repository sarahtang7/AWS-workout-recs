import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// import WorkoutPreferencesForm from './pages/WorkoutPreferencesForm';
// import UserProfileInput from './pages/UserProfileInput';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Completed from './pages/Completed';
import NewUserForms from './pages/NewUserForms';

function App() {
  return (
    <div className="App">

      <Router>
        <div id="navlink-header">
          <NavLink activeclassname="active" to="/home">Home</NavLink>
          <NavLink activeclassname="active" to="/favorites">Favorites</NavLink>
          <NavLink activeclassname="active" to="/completed">Completed</NavLink>
          <NavLink activeclassname="active" to="/profile">Profile</NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route class="navlinks" path="/auth" element={<Login />}></Route>
          <Route class="navlinks" path="/home" element={<Home />}></Route>
          {/* <Route class="navlinks" path="/quiz" element={<WorkoutPreferencesForm />}></Route>
          <Route class="navlinks" path="/createprofile" element={<UserProfileInput />}></Route> */}
          <Route class="navlinks" path="/profile" element={<Profile />}></Route>
          <Route class="navlinks" path="/favorites" element={<Favorites />}></Route>
          <Route class="navlinks" path="/completed" element={<Completed />}></Route>
          <Route class="navlinks" path="/createprofile" element={<NewUserForms />}></Route>
        </Routes>

      </Router>

    </div>
  );
}

export default App;
