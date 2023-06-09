import Login from './pages/Login'
import Home from './pages/Home'
import Games from './pages/Games'
import Transactions from './pages/Transactions'
import {Routes, Route, Link } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useGlobalContext } from "./contexts/appcontext"
import styled from 'styled-components'

const Wrapper = styled.div`
  nav { 
    display: flex;
    align-items: center;
  }
  .nav-links { 
    text-decoration: none;
    padding-right: 10px;
  }
`
function App() {
  const { userInfo} = useGlobalContext()
  const {isAuthenticated} = userInfo
  return (
    <div>
      <Wrapper>
      {
        isAuthenticated ? <nav>
        <Link to="/games" className='nav-links'>Games</Link>
        <Link to="/" className='nav-links'>Home</Link>
        <Link className='nav-links' to="/transactions">Account</Link>
      </nav> : null
      }
      </Wrapper>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={ <Home /> } />
          <Route path='/games' element={ <Games /> } />
          <Route path="/transactions" element={ <Transactions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
