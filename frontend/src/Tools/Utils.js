const uuidv4 = require('uuid').v4

export const setUser = () => {
    if(localStorage.getItem('username') === null) {
        localStorage.setItem('username', 'user-' + uuidv4())  
    }
}

