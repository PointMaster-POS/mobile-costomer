import fetch from 'node-fetch';

const AuthenticateUser = async ({ email, password }) => {
    if (!email || !password) {
      return false;
    }
  };
  
  export default AuthenticateUser;
  