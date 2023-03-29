import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import postData from '../helpers/fetch'
import { useGlobalContext } from "../contexts/appcontext";

const Home = () => { 

    const {user, setUser} = useGlobalContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [deposit, setDeposit] = useState(0)
    const [withdraw, setWithdraw] = useState(0)
    const [isShow, setIsShow] = useState(0)

    const depositHandler = (e) => { 
        setDeposit(e.target.value)
    }
    
    const withdrawHandler = (e) => { 
        setWithdraw(e.target.value)
    }

    const submitFunds = async (e) => {
        e.preventDefault()
        const route =  isShow == 2 ? "withdraw" : "deposit" 
        const url = `http://localhost:3032/api/v1/transaction/${route}`

        if (isShow == 2) { 
            const sendWithdraw = await postData(url, withdraw)
            setUser({...user, balance: sendWithdraw.amount})
            
        } else if (isShow == 1 ) { 
            const sendDeposit = await postData(url, deposit)
            setUser({...user, balance: sendDeposit.amount})
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
              setLoading(false)
            } catch(error) { 
        }
    }
 
    useEffect(()=> { 
       if (user.isAuthenticated) { 
           setLoading(false)
           getUserData()
       }
    },[user.isAuthenticated])

    if (loading) { 
        return <section><h2>loading...</h2></section>
    }
    return(

        <main> 
            <div>

            </div>
            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 15}}>
                <h2>Welcome {user.username} </h2>
                <p>current balance: {user.balance}</p>
                <Link to="/games">Games</Link>
            </div>
            <section>
                <div>
                    <button type="submit" id="withdraw"style={{marginRight: 15}} onClick={()=>{setIsShow(2)}}>Make a withdraw</button>
                    <button type="submit" id="deposit"onClick={()=> {setIsShow(1)}}>Make a deposit</button>
                </div>
                <div style={ isShow != 1 ? {display: 'none'} : null  }>
                    <form onSubmit={submitFunds}>
                        <label style={{marginRight: 45}}>Deposit Funds</label>
                        <input type="number" name="deposit" value={deposit} onChange={depositHandler} style={{ marginRight: 10}}  />
                        <button style={{marginRight: 25}} type="submit">Deposit</button>
                        <button onClick={()=>{setIsShow(0)}}>close</button>
                    </form>
                </div>
                <br></br>
                <div style={ isShow != 2 ? {display: 'none'} : null }>
                    <form onSubmit={submitFunds}>
                        <label style={{marginRight: 45}}>Withdraw Funds</label>
                        <input type="number" name="withdraw" value={withdraw} onChange={withdrawHandler} style={{marginRight: 10}} />
                        <button type="submit" style={{marginRight: 25}}>Withdraw</button>
                        <button onClick={()=>{setIsShow(0)}}>close</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Home