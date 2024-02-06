const getDataRegisterUser = async () => {
    // element ID.
    let usernameID = "username"
    let nicknameID = "nickname"
    let passwordID = "password"
    let emailID = "email"
    let firstnameID = "firstname"
    let lastnameID = "lastname"

    // collect dom.
    const username = document.getElementById(usernameID);
    const nickname = document.getElementById(nicknameID);
    const firstname = document.getElementById(firstnameID);
    const lastname = document.getElementById(lastnameID);
    const email = document.getElementById(emailID);
    const password = document.getElementById(passwordID);

    // get data
    const dataRegister = {
        username: username.value,
        nickname: nickname.value,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value
    };

    // send data register
    try{
        const response = await axios.post(
            'http://localhost:8000/user/register',
            dataRegister
        )
        
    } catch(error){
        console.log(error)
    }

    console.log(dataRegister);
}