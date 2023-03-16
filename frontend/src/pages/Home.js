import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import postData from '../helpers/fetch'

const Home = () => { 
    const initialUser = {
        balance: 0,
        username: ''
    }
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [userProperties, setUserProperties] = useState(initialUser)
    const [loading, setLoading] = useState(true)
    const [deposit, setDeposit] = useState(0)
    const [withdrawl, setWithdrawl] = useState(0)
    const [isWithdrawl, setIsWithdrawl] = useState(false)
    const [isDeposit, setIsDeposit] = useState(false)
    // function that checks if the username cookie is present in the browser

    const checkAuthentication = async () => { 
        const userCookie = Cookies.get('user')
        // if cookie is not present, set the user state value to null
        if (!userCookie) { 
            setUser('null')
        }
    }

    const depositHandler = (e) => { 
        setDeposit(e.target.value)
    }
    

    const withdrawlHandler = (e) => { 
        setWithdrawl(e.target.value)
        console.log(withdrawl)
    }

    const submitFunds = async (e) => {
        e.preventDefault()
        const completeDeposit = await postFunds()
    }

const postFunds = async () => { 
    if (deposit === 0 && withdrawl > 0) { 
        console.log(deposit)
            /*      
       const dataObject = {amount: deposit}
       const fundData = await fetch('http://localhost:3007/api/v1/transaction/deposit/', { 
           method: 'PATCH',
           credentials: 'include',
           headers: { 
               "Content-Type": "application/json"
           },
           body: JSON.stringify(dataObject)
       })
       const response = await fundData.json()
       setUserProperties({...userProperties, balance: response.amount})
       
    } catch(error) { 
        alert(error)
    }
        } catch(error) { 
            
        }
    */
         
    } else if (withdrawl === 0 && deposit > 0) { 
        console.log(deposit)
        // use a state value that has a drop down for withdrawling and depositing, or create a popup
    } else if (withdrawl > 0 && deposit > 0) { 
        alert('cant send withdrawl and deposit at the same time ')
    } else if (withdrawl === 0 && deposit === 0) { 
        console.log('values must be populated');
    } else { 
        console.log('catch all', deposit);
    }
        /*
       
    */
}

const showWithdrawl = async () => { 
    setIsWithdrawl(!isWithdrawl)
    setIsDeposit(false)
}

const showDeposit = async () => { 
   setIsDeposit(!isDeposit)
   setIsWithdrawl(false)
}
 
const getUserData = async () => { 
    try { 
        console.log('running get user data')
        const userData = await fetch('http://localhost:3007/api/v1/transaction', {
                method: "GET",
                credentials: 'include'
        })
              const response = await userData.json()
              const {accountBalance, username} = response.user
              console.log(accountBalance)
              console.log(username)
              setUserProperties({balance: accountBalance, username: username})
              setLoading(false)
            } catch(error) { 
        }
    }
    useEffect(()=> { 
       checkAuthentication()
       if (user === 'null') { 
            console.log('should be navigating user')
            navigate("/login")
       } 
       getUserData()
    },[user])

    if (loading) { 
        return <section><h2>loading...</h2></section>
    }
    return(

        <main> 
            <div>

            </div>
            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 15}}>
                <h2>Welcome {userProperties.username} </h2>
                <p>current balance: {userProperties.balance}</p>
                <Link to="/games">Games</Link>
            </div>
            <section>
                <div>
                    <button type="submit" id="withdrawl"style={{marginRight: 15}} onClick={showWithdrawl}>Make a withdrawl</button>
                    <button type="submit" id="deposit"onClick={showDeposit}>Make a deposit</button>
                </div>
                <div style={ isDeposit && !isWithdrawl ? null : {display: 'none'}}>
                    <form onSubmit={submitFunds}>
                        <label style={{marginRight: 45}}>Deposit Funds</label>
                        <input type="number" name="deposit" value={deposit} onChange={depositHandler} style={{ marginRight: 10}}  />
                        <button type="submit">Deposit</button>
                    </form>
                </div>
                <br></br>
                <div style={ isWithdrawl && !isDeposit ? null : {display: 'none'}}>
                    <form onSubmit={submitFunds}>
                        <label style={{marginRight: 45}}>Withdrawl Funds</label>
                        <input type="number" name="withdrawl" value={withdrawl} onChange={withdrawlHandler} style={{marginRight: 10}} />
                        <button type="submit">Withdrawl</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Home