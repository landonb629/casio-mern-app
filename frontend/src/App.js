import Login from './pages/Login'
import Home from './pages/Home'
import Games from './pages/Games'
import {Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/games' element={ <Games /> } />
      </Routes>
    </div>
  );
}

export default App;
