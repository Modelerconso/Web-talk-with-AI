const fs = require('fs');
let prompt = ''
fs.readFile("promptTeacher.txt", 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return "Error message"
    }
    prompt = data;
});

const conversationHistory = async (msg,historys) => {
    
    // API bard
    const { GoogleGenerativeAI } = await require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI("AIzaSyCcO88KEuw7dg-EwXagFTkMNu2igibxndU");
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    // history 
    let history = [
        {
            "role": "user",
            "parts": prompt
        },
        {
            "role": "model",
            "parts": "Ok Neng, I understand you tell."
        }
    ];
    history = history.concat(historys);
    console.log("History: ",history);
    const chat = await model.startChat({history});
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    return response.text();
}

module.exports = {
    conversationHistory
}