const axios = require('axios');

const baseURL = 'http://0.0.0.0:3081'
// const baseURL = 'http://172.16.1.234:3081'

export const createNew = (todo) => {
    return axios.post(`${baseURL}/add`,
        {
            todo: todo
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "username": localStorage.getItem('username')
            }
        })
        .catch(err => {
            console.error(err.log)
        })
}

export const markAsDone = (id, done) => {
    return axios.patch(`${baseURL}/update/${id}`,
        {
            "done": !done
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "username": localStorage.getItem('username')
            }
        }
    )
        .catch(err => {
            console.error(err.log)
        })
}

export const getAll = () => {
    return axios.get(baseURL, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "username": localStorage.getItem('username')
        }
    })
        .catch(err => {
            console.error(err.log)
        })
}

export const getById = (id) => {
    return axios.get(`${baseURL}/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "username": localStorage.getItem('username')
        }
    })
        .catch(err => {
            console.error(err.log)
        })
}

export const deleteById = (id) => {
    return axios.delete(`${baseURL}/delete/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "username": localStorage.getItem('username')
        }
    })
        .catch(err => {
            console.error(err.log)
        })
}

export const updateById = (id, body) => {
    return axios.patch(`${baseURL}/update/${id}`,
        body,
        {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "username": localStorage.getItem('username')
            }
        }
    )
        .catch(err => {
            console.error(err.log)
        })
}

export const sendFeedback = (feedback) => {
    return axios.post(`${baseURL}/feedback`,
        feedback
    )
    .catch(err => {
        console.error(err.log)
    })
}

export const viewFeedback = () => {
    return axios.get(`${baseURL}/feedback`,
    {headers: {
        "username": localStorage.getItem('username')
    }})
    .catch(err => {
        console.error(err.log)
    })
}