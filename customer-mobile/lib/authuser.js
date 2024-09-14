const axios = require('axios');

const AuthenticateUser = ({email, password}) => {
   //call endpoint to authenticate user
    //return true if user is authenticated, false otherwise
    axios.post('localhost:3002/customer/login', {
        email: email,
        password: password
    })


}

export default AuthenticateUser;