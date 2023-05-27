import {useEffect, useState} from 'react'
import sendPatch from '../helpers/sendPatch'
import { useGlobalContext } from '../contexts/appcontext'
// true is deposit, false is withdraw
const Transactions = () => { 
    const {userInfo, setUserInfo} = useGlobalContext()
    const [transactionType, setTransactionType] = useState(true)
    const [amount, setAmount] = useState(0)
    const [alert, setAlert] = useState(false)
    const [error, setError] = useState(false)

    const triggerAlert = async () => { 
        console.log(alert)
        setTimeout(()=> { 
            setAlert(false)
        }, 3000)
    }

    const triggerError = async () => { 
        setTimeout(()=> { 
            setError(false)
        }, 3000)
    } 

    const transactionSubmissions = async (e) => { 
        e.preventDefault()
        const url = process.env.NODE_ENV == 'development' ? "http://localhost:3032/api/v1/transaction" : "/api/v1/transaction"
    if (transactionType === true) { 
            const depositUrl = `${url}/deposit`
            const depositObject = {amount: amount}
            const request = await sendPatch(depositUrl, depositObject)
            if (request.status == 200) { 
                setAlert(true)
            } else { 
                setError(true)
                await triggerError()
            }
            const data = await request.json()
            
            setUserInfo({...userInfo, balance: data.amount})    
            localStorage.setItem('balance', `${data.amount}`)     
            await triggerAlert() 
        } else { 
            console.log(`withdraw amount: ${amount}`);
            const withdrawUrl = `${url}/withdraw`
            const withdrawAmount = {amount: amount}
            const request = await sendPatch(withdrawUrl, withdrawAmount)
            const data = await request.json()
            setUserInfo({...userInfo, balance: data.amount})
            localStorage.setItem('balance', `${data.amount}`)
            console.log(userInfo)
        }
    }


    const transactionToggle = () => { 
        setTransactionType(!transactionType)
    }

    const amountHandler = (e) => { 
        e.preventDefault()  
        console.log(amount)
        setAmount(e.target.value)
    }

    return(
       
       <section>
           <div className='alert-section'>
                {
                alert ? <h3>thank you for depositing {amount}</h3> : null
                }
           </div>
           <div>
               {
                   error ? <h3>there was an error processing your request</h3> : null
               }
           </div>
           <h2 style={{display: 'inline'}}>Account Transactions </h2>
           
           <button style={{ border: 'none', 
                            outline: 'none', 
                            background: 'none', 
                            textDecoration: 'underline'}} 
                   onClick={transactionToggle}>{ transactionType ? "Switch to Withdraw" : "Switch to Deposit"}
            </button>
        
           <form onSubmit={transactionSubmissions}>
               <label>
                   { transactionType ? "Deposit amount:" : "Withdraw amount: "}
                   <input type="number" name="transaction"  onChange={amountHandler} />
               </label><br></br>
            <button style={{ marginTop: 10}} type="submit">{ transactionType ? "Deposit" : "Withdraw"}</button>
           </form>
       </section>
    )
}

export default Transactions