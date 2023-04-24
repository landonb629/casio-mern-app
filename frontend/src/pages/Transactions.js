import {useState} from 'react'
import sendPatch from '../helpers/sendPatch'
import { useGlobalContext } from '../contexts/appcontext'
// true is deposit, false is withdraw
const Transactions = () => { 
    const {userInfo, setUserInfo} = useGlobalContext()
    const [transactionType, setTransactionType] = useState(false)
    const [amount, setAmount] = useState(0)

    const transactionSubmissions = async (e) => { 
        e.preventDefault()
        const url = "http://localhost:3032/api/v1/transaction"
        if (transactionType) { 
            console.log(`depositing ${amount}`);
            const depositUrl = `${url}/deposit`
            const depositObject = {amount: amount}
            const request = await sendPatch(depositUrl, depositObject)
            const data = await request.json()
            setUserInfo({...userInfo, balance: data.amount})
            localStorage.setItem('balance', `${data.amount}`)
        } else { 
            console.log(`withdraw amount: ${amount}`);
            const withdrawUrl = `${url}/withdraw`
            const withdrawAmount = {amount: amount}
            const request = await sendPatch(withdrawUrl, withdrawAmount)
            const data = await request.json()
            setUserInfo({...userInfo, balance: data.amount})
            localStorage.setItem('balance', `${data.amount}`)
        }
    }


    const transactionToggle = () => { 
        setTransactionType(!transactionType)
        console.log(transactionType);
    }

    const amountHandler = (e) => { 
        e.preventDefault()   
        setAmount(e.target.value)
    }
    return(
       <section>
           <h2 style={{display: 'inline'}}>Account Transactions </h2>

           <button style={{ border: 'none', 
                            outline: 'none', 
                            background: 'none', 
                            textDecoration: 'underline'}} 
                   onClick={transactionToggle}>{ transactionType ? ("Switch to Withdraw") : !transactionType ? ("Switch to Deposit") : null}
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