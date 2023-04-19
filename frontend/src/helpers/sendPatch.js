const sendPatch = async (url, data) => { 
    console.log(data);
    const requestConfig = { 
        method: 'PATCH',
        credentials: 'include',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    }
    const sendRequest = await fetch(url, requestConfig)
    return sendRequest
}

export default sendPatch