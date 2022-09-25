import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import AuthProvider from './AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <>

      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
              <Route path='/update-profile' element={<UpdateProfile />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
