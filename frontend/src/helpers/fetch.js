const postData = async (url, data) => { 
    try { 
        console.log(url, data);
         const dataObject = {amount: data}
         const fundData = await fetch(url, { 
           method: 'PATCH',
           credentials: 'include',
           headers: { 
               "Content-Type": "application/json"
           },
           body: JSON.stringify(dataObject)
       })
       const response = await fundData.json()
       return response
    }  catch(error) { 
        return error
    }
}

export default postData