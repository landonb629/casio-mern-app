import React from "react";
import {useState, useEffect} from 'react'
import {useGlobalContext} from "../contexts/appcontext"
import postData from "../helpers/fetch"
import {Link, useNavigate} from 'react-router-dom'
import { Navigate } from "react-router-dom";
const Games = () => { 
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const {user, setUser} = useGlobalContext() 



    const playGame = async (name, cost) =>  {
      try { 
        const url = "http://localhost:3032/api/v1/transaction/withdrawl"
        const purchaseGame = await postData(url, cost)
        alert(`thank you for playing ${name}, ${cost} has been withdrawn from your account`)
        setUser({...user, balance: purchaseGame.amount})
      } catch(error) { 
        console.log(error);
      }
    }

    const getUserData = async () => { 
      try { 
          console.log('running get user data')
          const userData = await fetch('http://localhost:3032/api/v1/transaction', {
                  method: "GET",
                  credentials: 'include'
          })
                const response = await userData.json()
                const {accountBalance, username} = response.user
                setUser({...user, balance: accountBalance, username: username})
                console.log(user)
              } catch(error) { 
          }
      }
/*
    useEffect(()=> { 
      if (!user.isAuthenticated) { 
           console.log('should be navigating user')
           navigate("/login")
      } 
      getUserData()
   },[])
*/

    
    useEffect(()=> { 
      const getGames = async () => {
          try { 
            const url = "http://localhost:3032/api/v1/games/"
            const request = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: { 
                "Content-Type": "application/json"
            }
            })
            const reqGames = await request.json()
            setGames(reqGames.game);
          } catch(error) { 
           console.log(error) 
          }
        }
        getGames()
    },[])

    return(
       <section>
           <div>
               <h2>Games available</h2>
               <Link to="/">Home</Link>
               <h4>balance: {user.balance}</h4>
           </div>
           <div>    
           {
            games.map((game)=>{
             return(
                <div key={game._id} style={{display: 'inline-flex', alignItems: 'center', border: 'solid', padding: 10, margin: 10}}>
                  <h4 style={{margin: 10, display: 'flex'}}>{game.name}</h4>
                  <p style={{margin: 10}}> cost: {game.cost}</p>
                  <div>
                    <button onClick={()=> {playGame(game.name, game.cost)}}>play</button>
                  </div>
                </div>
             ) 
            })
            }
           </div>
       </section>
    )
}

export default Games