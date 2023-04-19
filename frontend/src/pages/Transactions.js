import {useState} from 'react'
import sendPatch from '../helpers/sendPatch'
// true is deposit, false is withdraw
const Transactions = () => { 
    const [transactionType, setTransactionType] = useState(false)
    const [amount, setAmount] = useState(0)

    const transactionSubmissions = async (e) => { 
        e.preventDefault()
        const url = "http://localhost:3032/api/v1/transaction"
        if (transactionType) { 
            const depositUrl = `${url}/deposit`
            const depositObject = {amount: amount}
            const request = await sendPatch(depositUrl, depositObject)
            const data = await request.json()
        } else { 
            const withdrawUrl = `${url}/withdraw`
            const request = await sendPatch(withdrawUrl, amount)
            const data = await request.json()
            alert(`new amount: ${data.amount}`)
        }
    }

    const transactionToggle = () => { 
        setTransactionType(!transactionType)
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