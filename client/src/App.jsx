import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './project/Register';
import Home from './page/Home';
import { Toaster } from 'react-hot-toast'
import Videos from './page/Video';
import MasnoryModal from './page/ImageModal';
import Login from './project/Login';
import ImageUpload from './page/upload';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/videos' element={< Videos/>} />
        <Route path='/ImageModal' element={<MasnoryModal/>}/>
        <Route path='/upload' element={<ImageUpload/>}/>
      </Routes>
      <Toaster/>
    </>
  );
}


export default App;
