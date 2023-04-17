import {useState} from 'react'
// true is deposit, false is withdraw
const Transactions = () => { 
    const [transactionType, setTransactionType] = useState(false)

    const transactionSubmissions = () => { 
        console.log(transactionType);
        if (transactionType) { 
            //send deposit
        } else { 
            //send withdraw
        }
    }

    const transactionToggle = () => { 
        setTransactionType(!transactionType)
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
           <form>
               <label>
                   { transactionType ? "Deposit amount:" : "Withdraw amount: "}
                   <input type="number" name="transaction" />
               </label><br></br>
            <button style={{ marginTop: 10}}type="submit">{ transactionType ? "Deposit" : "Withdraw"}</button>
           </form>
       </section>
    )
}

export default Transactions