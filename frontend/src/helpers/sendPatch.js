const sendPatch = async (url, data) => { 
    try{ 
        console.log(`sending the following data: ${data}`);
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
        console.log(requestConfig)
        const sendRequest = await fetch(url, requestConfig)
        console.log(sendRequest)
        return sendRequest

    } catch(error) { 
        console.log(error);
    }
 
}

export default sendPatch