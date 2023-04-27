import './App.css';
import { GoogleButton } from "react-google-button"
import { Navbar } from "react-bootstrap"
import NavbarComp from './Components/NavbarComp';
import { Routes, Route, Router } from "react-router-dom";
import Welcome from './Pages/Welcome';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { UserAuth } from './Context/AuthContext';
import Main from './Pages/Main';
import NotValidRoute from './Pages/NotValidRoute';

function App() {

  const {user} = UserAuth()

  return (
    <div className="App">
      <NavbarComp />
      <div className="Body">
          <Routes>
            {!user && <Route path='/' element={<Welcome />}></Route>}
            {user && <Route path='/' element={<Main/>}></Route>}
            {!user && <Route path="/signup" element={<SignUp />}></Route>}
            {!user && <Route path="/login" element={<Login />}></Route>}
            <Route path="*" element={<NotValidRoute />}></Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;
