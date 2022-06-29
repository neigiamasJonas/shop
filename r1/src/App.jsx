import './App.scss';
import './bootsrap.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom"; 
import Back from "./Components/Back/Back";
import Front from "./Components/Front/Front";


function App() {
  return (
    
      <BrowserRouter>
  
          <Routes>
              <Route path="/" element={<Front></Front>}></Route>
              <Route path="/admin" element={<Back></Back>}></Route>
          </Routes>
          
      </BrowserRouter>
  
  );
}

export default App;
