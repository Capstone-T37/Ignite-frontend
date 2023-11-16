import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from "firebase/auth";
import { signInWithCustomToken } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
/**
 * Configuring the firebase instance.
 */
export const DEFAULT_FIREBASE_CONFIG: FirebaseOptions = {
    apiKey: "AIzaSyCmFMo9nr0d8uYZizQAD6qB7BdB8Zg_-vs",
    authDomain: "social-app-64380.firebaseapp.com",
    projectId: "social-app-64380",
    storageBucket: "social-app-64380.appspot.com",
    messagingSenderId: "714375950645",
    appId: "1:714375950645:web:5148f6f25ab8462f675c7c",
    measurementId: "G-KXWX1WBNKM"
  }


export class Firebase {
    firebase: FirebaseApp
    auth: Auth
    config: FirebaseOptions
    db: Firestore

    constructor(config: FirebaseOptions = DEFAULT_FIREBASE_CONFIG) {
        this.config = config;
        this.firebase = initializeApp(this.config)
        this.auth = getAuth(this.firebase)
        this.db = getFirestore(this.firebase)
    }
    async signInWithCustomToken(customToken: string) {
        try {
            await signInWithCustomToken(this.auth, customToken)
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`firebase auth failed: ${e.message}\n${customToken}`, e.stack)
            }
            console.error(e)
        }
    }





}

// Singleton instance of firebase for convenience
export const firebase = new Firebase()