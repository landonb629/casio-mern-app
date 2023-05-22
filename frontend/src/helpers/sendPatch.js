const sendPatch = async (url, data) => { 
    try{ 
        console.log(`sending the following data: ${data}`);
        const requestConfig = { 
            method: 'POST',
            credentials: 'include',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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