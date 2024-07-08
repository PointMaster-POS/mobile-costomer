const AuthenticateUser = ({email, password}) => {
    if( email === 'admin' && password === 'admin') {
        return true;
    }
    return false;
}

export default AuthenticateUser;