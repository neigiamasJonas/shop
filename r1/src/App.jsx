import './App.scss';
import './bootstrap.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom"; 
import Back from "./Components/Back/Back";
import Front from "./Components/Front/Front";


function App() {
  return (
    
      <BrowserRouter>
  
          <Routes>
              <Route path="/" element={<Front></Front>}></Route>
              <Route path="/admin" element={<Back show="admin"></Back>}></Route>
              <Route path="/admin/cats" element={<Back show="cats"></Back>}></Route>
              <Route path="/admin/products" element={<Back show="products"></Back>}></Route>
          </Routes>
          
      </BrowserRouter>
  
  );
}

export default App;
