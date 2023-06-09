const sendPost = async (url, data) => { 
    console.log(data)
    const requestConfig = { 
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const sendRequest = await fetch(url, requestConfig)
    console.log(sendRequest)
    return sendRequest
}

export default sendPost 