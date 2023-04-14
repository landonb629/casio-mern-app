import { useGlobalContext } from "../contexts/appcontext"
import {useEffect} from 'react'
import {Link} from 'react-router-dom'

const Home = () => { 
    const {userInfo} = useGlobalContext()
    
   console.log(userInfo.isAuthenticated);
    console.log('page loaded');
    return <>
       <main>
           <section className="home-header">
               <h1>{`welcome home, ${userInfo.username}`}</h1>
               <div>
                   <h4>{`your current balance is: ${userInfo.balance}`}</h4>
               </div>
           </section>
       </main>
    </>
}

export default Home