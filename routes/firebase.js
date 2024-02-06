const { initializeApp } = require('firebase/app');
const { getFirestore, connectFirestoreEmulator } = require('firebase/firestore');

// API Key
const firebaseConfig = {
  apiKey: 'AIzaSyAU6yxUERYXZh_sznKKWm78cT60QjoP5GM',
  authDomain: 'talk-with-chat-ai-c3bfa.firebaseapp.com',
  databaseURL: 'https://talk-with-chat-ai-c3bfa-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'talk-with-chat-ai-c3bfa',
  storageBucket: 'talk-with-chat-ai-c3bfa.appspot.com',
  messagingSenderId: '116146998230',
  appId: '1:116146998230:web:1c4866730b3747ae94b277'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

module.exports = {
    db,
    firebaseConfig
};