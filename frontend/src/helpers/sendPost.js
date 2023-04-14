const sendPost = async (url, data) => { 
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
    return sendRequest
}

export default sendPost 