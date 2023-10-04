import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<h1>Home page</h1>}
          />

          <Route
            path='/login'
            element={<Login />}
          />

          <Route
            path='/signup'
            element={<Signup />}
          />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
