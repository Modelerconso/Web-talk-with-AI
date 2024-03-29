let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition;

let  result = document.querySelector(".result");

const speechToText = () => {
    try{
        recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.start();
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            //detect when intrim results
            if (event.results[0].isFinal) {
                result.innerHTML += " " + speechResult;
            }
        };

        recognition.onspeechend = () => {
            speechToText();
        };

        recognition.onerror = (event) => {
            if (event.error === "no-speech") {
                alert("No speech was detected. Stopping...");
                stopRecording();
            } 
        };
    } catch (error) {
        console.log(error);
    }
}

const generateTime = () => {
    // Generate time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    // Pad single digit hours and minutes with leading zeros
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    return hours + ":" + minutes
}

// message user
const messageUser = (message) => {
    let contentDOM = document.getElementById("response");
    contentDOM.innerHTML += 
        "<div class='message-user'>" + 
            "<div class='bubble'>" +
                "<div class='info'>" +
                    "<div class='name'>User</div>" +
                    "<div class='time'>" + generateTime() + "</div>"+
                "</div>" +
                "<div class='text'>" +
                    message +
                "</div>" +
            "</div>" +
        "</div>";
}

// message ai
const messageAi = (message) => {
    let contentDOM = document.getElementById("response");
    contentDOM.innerHTML += 
        "<div class='message-ai'>" + 
            "<div class='box-img'>" +
                "<img src='../images/AI.png' alt='AI'>" +
            "</div>" +
            "<div class='bubble'>" +
                "<div class='info'>" +
                    "<div class='name'>AI</div>" +
                    "<div class='time'>"+ generateTime() + "</div>"+
                "</div>" +
                "<div class='text'>" +
                    message +
                "</div>" +
            "</div>" +
        "</div>";
}

// Scroll to bottom
const scrollDownToAuto = () => {
    let content = document.getElementById('response');
    content.scrollTo(0,content.scrollHeight);
}

// textToSpeech.
const textToSpeech = (text) => {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// Microphone.
let imageDOM = document.getElementById("microphone-image");
let historys = []

// Keyboard
document.addEventListener('keyup', function (event) {
    if (event.key == " " ){
        eventListener();
    }
})

// Recording ...
const eventListener = async () => {
    if (imageDOM.alt === 'microphone-green') {
        startRecording();
    } else {
        // collect data recording.
        const messsageVoic = result.innerHTML;
        const dataRecord = {
            role: "user",
            message: messsageVoic,
            historys
        };

        // Check message input isn't emptry.
        if(dataRecord.message != ""){
            // change style(microphones).
            messageUser(dataRecord.message);
            scrollDownToAuto();

            // Stop record microphone.
            stopRecording();

            try{
                const response = await axios.post(
                    'http://localhost:8000/message/user',
                    dataRecord
                );
                let messageAI = response.data.message;
                // Scroll down and respose message AI.
                messageAi(messageAI);
                scrollDownToAuto();
                textToSpeech(messageAI);
                historys.push({
                    "role": "user",
                    "parts": messsageVoic
                });
                historys.push({
                    "role": "model",
                    "parts": messageAI
                });
            } catch(error){
                // When It have error stop.
                stopRecording();
                console.log(error)
            }
        } else{
            // Stop record microphone.
            stopRecording();
        }
    }
}

function startRecording() {
    speechToText();
    imageDOM.src = '../images/Microphone-red.png';
    imageDOM.alt = 'microphone-red';
}

function stopRecording() {
    recognition.stop();
    imageDOM.src = '../images/Microphone-green.png';
    imageDOM.alt = 'microphone-green';
    result.innerHTML = ""
}