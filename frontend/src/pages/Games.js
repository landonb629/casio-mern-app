import { useEffect, useState } from "react"
import { useGlobalContext } from "../contexts/appcontext"
import sendPatch from "../helpers/sendPatch"
const Games = () => { 
  const {userInfo} = useGlobalContext()
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  console.log(userInfo);

  const populateGames = async () => {
    try { 
      const options = { 
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const url = "/api/v1/games/"
      const request = await fetch(url)
      const response = await request.json()
      console.log(response.game);
      setGames(response.game)
      setIsLoading(!isLoading)
      console.log(games);
    } catch(error) { 
      console.log(error);
    }
  }

  const playGame = async (game) => { 
    try {
      const url = "/api/v1/transaction/withdraw" 
      const data = {amount: game}
      console.log(data);
      const request = await sendPatch(url, data)
      const response = await request.json()
      localStorage.setItem('balance', response.amount)
    } catch (error) { 
      console.log(error);
    }
  }

  useEffect(()=> { 
    populateGames()
  },[])
  return <>
    <main>
      <h1>Welcome to the virtual casino</h1>
      <section className="howTo" style={{textAlign: 'center'}}>
          <h2>your current account balance: {userInfo.balance}</h2>
          <h4>To play games, first make sure you have deposited money into your account</h4>
          <h4>Once you have money in your account, you can click the "play" button on any game to play</h4>
      </section>
      <section className="games">
        
          {
            games.map((game, i)=> {
              return <>
                <div key={i}>
                  <h4>{game.name}</h4>
                  <p>{game.cost}</p>
                  <button type="submit" onClick={()=>playGame(game.cost)}>play {game.name}</button>
                </div>
              </>
            })
          }
      </section>
    </main> 
  </>
}

export default Games