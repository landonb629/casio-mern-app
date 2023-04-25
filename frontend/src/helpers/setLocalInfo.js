const setLocalInfo= (payload) => { 
    const getUserId = localStorage.getItem('userId')
    console.log(`setting userId: ${payload.userId}`);
    console.log(`setting balance: ${payload.balance}`);
    if (!getUserId) { 
      localStorage.setItem('userId', `${payload.userId}`)
      localStorage.setItem('username', `${payload.username}`)
      if (payload.balance === undefined) { 
        localStorage.setItem('balance', `0`)
      } else { 
        localStorage.setItem('balance', `${payload.balance}`)
      }
     
    } else { 
        console.log('userId already set');
    }
}

export default setLocalInfo