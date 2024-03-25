
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUsers from './pages/AddUsers';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer />
      <Routes>
      <Route path='/' element={<AddUsers />} />
      <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
