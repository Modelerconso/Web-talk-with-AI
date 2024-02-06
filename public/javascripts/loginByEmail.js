import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, connectAuthEmulator,GoogleAuthProvider, signInWithPopup} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Login by Google.
const loginGmail = async () => {
  try{
        const response = await axios.get(
            'http://localhost:8000/get/apikey'
        )
        // Initialize Firebase
        const firebaseConfig = response.data
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        let result = "";
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // set token email in local storage.
            localStorage.setItem('tokenEmail',token);
            // The signed-in user info.
            const user = result.user;
            console.log("user: ",user);
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
        
        console.log(result);
    } catch(error){
        console.log(error)
    }
}

const login = document.getElementById("loginGmail");
login.addEventListener('click', loginGmail);

