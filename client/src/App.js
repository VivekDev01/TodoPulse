import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path='/signup'
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
