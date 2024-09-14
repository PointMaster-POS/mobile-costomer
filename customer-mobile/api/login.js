
const LoginURL = 'http://localhost:3002/customer/login';


const Login = async (data) => {
    console.log({data_at_login_api: data});

    try {
        const response = await fetch(LoginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error:', error.message); 
    }
};

export default Login;