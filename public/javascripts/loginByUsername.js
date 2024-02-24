// Login 
const loginByUsername = async () => {
    const usernameDOM = document.getElementById("username");
    const passwordDOM = document.getElementById("password");
    
    // Collect data login.
    const dataLogin = {
        username: usernameDOM.value,
        password: passwordDOM.value
    }
    
    // Send data login to server
    try{
        const response = await axios.post(
            'http://localhost:8000/user/login',
            dataLogin
        )
        
        localStorage.setItem('tokenUsername',response.data.token);
        // Next to conversation page.
        window.location.href = '../html/index.html'

    } catch(error){
        console.log(error)
    }
}