const userRegister = async (url, values) => {

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await response.json();

}

export default userRegister