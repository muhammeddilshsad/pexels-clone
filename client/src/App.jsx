import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './project/Register';
import Login from './project/login';
import Home from './page/Home';
import { Toaster } from 'react-hot-toast'
import Videos from './page/Video';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/videos' element={< Videos/>} />

      </Routes>
      <Toaster/>
    </>
  );
}


export default App;
