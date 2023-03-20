import React from "react";
import {useState, useEffect} from 'react'




const Games = () => { 
    const [games, setGames] = useState([])
    useEffect(()=> { 
      const getGames = async () => {
          try { 
            const url = "http://localhost:3007/api/v1/games/"
            const request = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: { 
                "Content-Type": "application/json"
            }
            })
            const reqGames = await request.json()
            console.log(reqGames)
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
           </div>
           <div>    
           {
            games.map((game)=>{
             return(
                <div key={game._id} style={{display: 'inline-flex', alignItems: 'center', border: 'solid', padding: 10, margin: 10}}>
                  <h4 style={{margin: 10}}>{game.name}</h4>
                  <p style={{margin: 10}}> cost: {game.cost}</p>
                  <div>
                    <button>play</button>
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