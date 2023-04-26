import './App.css';
import { GoogleButton } from "react-google-button"
import { Navbar } from "react-bootstrap"
import NavbarComp from './Components/NavbarComp';
import { Routes, Route, Router } from "react-router-dom";
import Welcome from './Pages/Welcome';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <div className="Body">
          <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;
