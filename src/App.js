// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
