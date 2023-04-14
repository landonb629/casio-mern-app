import Login from './pages/Login'
import Home from './pages/Home'
import Games from './pages/Games'
import {Routes, Route, Link } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useGlobalContext } from "./contexts/appcontext"



function App() {
  const { userInfo} = useGlobalContext()
  const {isAuthenticated} = userInfo
  console.log(isAuthenticated);
  return (
    <div>
      <nav style={{ display: 'flex', alignItems: 'center'}}>
        <Link to="/games" style={{display: 'flex', marginRight: 10}}>Games</Link>
        <Link to="/" style={{display: 'flex'}}>Home</Link>
      </nav>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={ <Home /> } />
          <Route path='/games' element={ <Games /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
