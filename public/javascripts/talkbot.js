const changeIcon = () => {
    let imageDOM = document.getElementById("microphone-image");
    if(imageDOM.alt === 'microphone-green'){
        imageDOM.src = '../images/Microphone-red.png';
        imageDOM.alt = 'microphone-red';
    }else {
        imageDOM.src = '../images/Microphone-green.png';
        imageDOM.alt = 'microphone-green';
        console.log("Green")
    }
}