
const addCategory = async (obj) => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/add-category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;
}


const getAllCategories = async () => {
    const response = await fetch(`https://rapid-home-solution-server.vercel.app/api/services/get-all-categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify(obj)

    })

    const data = await response.json();
    return data;
}


export {addCategory, getAllCategories}
