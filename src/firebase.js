import { initializeApp, } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBw6WNvOrQURD9slu7bX5jkCX6hGhsAJnc",
    authDomain: "rickandmorty-reactredux.firebaseapp.com",
    projectId: "rickandmorty-reactredux",
    storageBucket: "rickandmorty-reactredux.appspot.com",
    messagingSenderId: "689062248984",
    appId: "1:689062248984:web:555804545b5dd94d83b96d",
    measurementId: "G-DZEBRERPRS"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export async function getFavorites(uid) {

    const docRef = doc(db, "favorites", uid)
    const docSnap = await getDoc(docRef)
    try {
        if (docSnap.exists()) {
            return docSnap.data().favorites;
        } else {
            // doc.data() will be undefined in this case
            return { error: "No such document!" }
        }

    } catch (e) {
        return { error: e }
    }
}

export async function updateDB(favorites, uid) {
    try {
        setDoc(doc(db, "favorites", uid), { favorites })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export function signOutGoogle() {
    const auth = getAuth();
    signOut(auth)
        .then(res => res)
        .catch(error => error)
}

export function loginWithGoogle() {
    const auth = getAuth()
    let provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
        .then(result => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.token
            const user = result.user
            return {
                token, ...user
            }
        })
        .catch(error => {
            console.log(error)
            return error
        })
}
const analytics = getAnalytics(app);