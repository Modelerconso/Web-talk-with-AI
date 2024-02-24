// Get a reference to the element
var profileDOM = document.getElementById("profile");
// Attach a click event listener to the element
profileDOM.addEventListener("click", function() {
    informationUser();
});

// Checking path
if (window.location.pathname === "/profile.html") {
    // Attach click event listener
    $("#profile").on("click", function() {
        informationUser();
    });
}

// Show data user.
const informationUser = async () => {
    const usernameDOM = document.getElementById("box-username");
    const firstnameDOM = document.getElementById("box-firstname");
    const lastnameDOM = document.getElementById("box-lastname");
    const emailDOM = document.getElementById("box-email");
    const nicknameDOM = document.getElementById("box-nickname");

    // API get information user.
    try{
        // get data token.
        const data = {
            token: localStorage.getItem('tokenUsername')
        };
        
        // JWT convert to username 
        const dataUser = await axios.post(
            'http://localhost:8000/get/userdata',
            data
        )
    
        // Set data user.
        // document.getElementById("box-username").textContent(dataUser.username);
        firstnameDOM.value = dataUser.firstname;
        // firstnameDOM.setAttribute(dataUser.firstname);
        // lastnameDOM.setAttribute(dataUser.lastname);
        // emailDOM.setAttribute(dataUser.email);
        // nicknameDOM.setAttribute(dataUser.nickname);

    }catch(error){
        console.log(error);
    }

}