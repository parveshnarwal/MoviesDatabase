import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AuthProvider from './AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>

      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
