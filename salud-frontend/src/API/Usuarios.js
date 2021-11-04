import axios from 'axios';

export function updateUser(user) {
    axios.post('http://localhost:8080/users', user)
        .then(function (response) {
            console.log('VAMOOOOO')
            console.log(response);
        })
        .catch(function (error) {
            console.log('NOOOOOOOOO')
            console.log(error);
        });
}