import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register'
import Navbar from './components/Navbar';
/*import Footer from './components/Footer';*/

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      {/*<Footer/>*/}
    </>
  );
}

export default App;
