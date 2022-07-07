import './bootstrap.css';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';
import { login, logout, authConfig } from './Functions/auth';
import axios from 'axios';
import { useState, useEffect } from "react";


function App() {
  return (
    
      <BrowserRouter>
  
          <Routes>
              <Route path="/" element={<Front></Front>}></Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/admin" element={<RequireAuth><Back show="admin"></Back></RequireAuth>}></Route>
              <Route path="/admin/cats" element={<RequireAuth><Back show="cats"></Back></RequireAuth>}></Route>
              <Route path="/admin/products" element={<RequireAuth><Back show="products"></Back></RequireAuth>}></Route>
          </Routes>
          
      </BrowserRouter>
  
  );
}

export default App;



function RequireAuth({ children }) {
    const [view, setView] = useState(<h2>Please wait...</h2>);
  
    useEffect(() => {
      axios.get('http://localhost:3006/login-check?role=admin', authConfig())   // prie login-check prirashau ?role=admin
        .then(res => {
          if ('ok' === res.data.msg) {
            setView(children);
          } else {
            setView(<Navigate to="/login" replace />);
          }
        })
  
    }, [children]);
  
    return view;
  }
  
  function LoginPage() {
    const navigate = useNavigate();
  
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
  
    const doLogin = () => {
      axios.post('http://localhost:3006/login', { user, pass })
        .then(res => {
          console.log(res.data);
          if ('ok' === res.data.msg) {
            login(res.data.key);
            navigate('/admin/', { replace: true });
          }
        })
    }
    return (
      <div>
        <div>name: <input type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
        <div>password: <input type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
        <button onClick={doLogin}>Login</button>
      </div>
    );
  }
  
  function LogoutPage() {
    useEffect(() => logout(), []);
    return (
      <Navigate to="/login" replace />
    )
  }
  
  
//   function PublicPage() {
//     useEffect(() => {
//       axios.get('http://localhost:3003/admin/hello', authConfig())
//         .then(res => {
//           console.log(res)
//         })
  
//     }, []);
//     return <h3>Public</h3>;
//   }
  
//   function AdminPage() {
//     return (
//       <>
//         <h3>Admin</h3>
//         <Link to="/logout">Logout</Link>
//       </>
//     );
//   }
