import { useGlobalContext } from "../contexts/appcontext"
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Logout from "../components/Logout"

const Home = () => { 
    const {userInfo} = useGlobalContext()
    console.log(userInfo)
    const balance = localStorage.getItem('balance')
    const username = localStorage.getItem('username')
    console.log(`local storage balance: ${balance}`)
    return <>
       <main>
           <section className="home-header">
               <div>
                   <Logout />
               </div>
               <h1>{`welcome home, ${username}. deployment`}</h1>
               <div>
                   <h4>{`your current balance is: ${balance}`}</h4>
               </div>
           </section>
       </main>
    </>
}

export default Home