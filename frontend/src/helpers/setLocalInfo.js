const setLocalInfo= (payload) => { 
    const getUserId = localStorage.getItem('userId')
    if (!getUserId) { 
      localStorage.setItem('userId', `${payload.userId}`)
      localStorage.setItem('username', `${payload.username}`)
    } else { 
        console.log('userId already set');
    }
}

export default setLocalInfo