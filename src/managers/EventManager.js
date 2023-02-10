export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(event)})
        .then(response => response.json())
        .then(() => {
            getEvents()
        })
}

// export const getGameTypes = () => {
//     return fetch("http://localhost:8000/gametypes", {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`
//         }
//     })
//         .then(response => response.json())
// }