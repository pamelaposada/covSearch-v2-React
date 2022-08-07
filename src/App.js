import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './components/pages/Dashboard';
import SearchByCountry from './components/pages/SearchByCountry';
import Navbar from './components/UI/Navbar';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/search' element={<SearchByCountry/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
