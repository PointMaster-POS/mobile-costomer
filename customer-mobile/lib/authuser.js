const AuthenticateUser = ({email, password}) => {
    //this should be an API call
    if( email === 'admin' && password === 'admin') {
        return true;
    }
    return false;
}

export default AuthenticateUser;