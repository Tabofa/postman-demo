const axios = require('axios');

// const baseURL = 'http://0.0.0.0:3081'
const baseURL = 'http://postman-demo.ddns.net:3081'

export const createNew = (todo) => {
    return axios.post(`${baseURL}/add`,
        {
            todo: todo
        },
        {
            headers: {
                "Content-Type": "application/json",
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