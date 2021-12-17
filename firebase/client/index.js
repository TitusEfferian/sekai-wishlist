import firebase from 'firebase/app'
// import 'firebase/auth' // If you need it
// import 'firebase/firestore' // If you need it
// import 'firebase/storage' // If you need it
// import 'firebase/analytics' // If you need it
// import 'firebase/performance' // If you need it

const clientCredentials = {
    apiKey: "AIzaSyCD-JyFReb16uAf9IWSzH45HAUgb-75pvU",
    authDomain: "pjsekai-song-wishlist.firebaseapp.com",
    projectId: "pjsekai-song-wishlist",
    storageBucket: "pjsekai-song-wishlist.appspot.com",
    messagingSenderId: "10163495734",
    appId: "1:10163495734:web:8eb0c0a64729583162c997",
    measurementId: "G-PVYTY4NDFT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ('measurementId' in clientCredentials) {
            // firebase.analytics()
            // firebase.performance()
        }
    }
}

export default firebase