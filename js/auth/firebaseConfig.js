import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// IMPORTANT: Public name of the App Trip-Planner-App, Contact mail: wrazumichin@gmail.com
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tripplanner-c8c61.firebaseapp.com",
    databaseURL: "https://tripplanner-c8c61-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tripplanner-c8c61",
    storageBucket: "tripplanner-c8c61.appspot.com",

    messagingSenderId: "630968463946",
    appId: "1:630968463946:web:ef44b9f3ce0f0e819e6cb3",
    measurementId: "G-5R797M726B"
};

const app = initializeApp(firebaseConfig);

function writeData(userId, tripName, city){
    const db = getDatabase();
    const reference = ref(db, 'trips/' + userId);

    set(reference, {
        tripName: tripName,
        city: city,
    });
}

const db = getDatabase();
const reference = ref(db, 'trips/IndiaTrip');
remove(reference);

writeData("VietnamTrip", "Alehahca", "Mumbai");

export const auth = getAuth(app);
