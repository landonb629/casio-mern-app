const sendPatch = async (url, data) => { 
    try{ 
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
        return sendRequest
    } catch(error) { 
        console.log(error);
    }
 
}

export default sendPatch