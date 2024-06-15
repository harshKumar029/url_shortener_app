import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/login&signup/Login';
import Signup from './pages/login&signup/Signup';
import Insides from './components/Insides';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/dashboard' element={<Dashboard/>}/>
           <Route path="/login" element={<Login />} />
           <Route path="/createuser" element={<Signup />} />
           <Route path="/insights" element={<Insides />} />
      </Routes>
    </Router>
  );
}

export default App;
