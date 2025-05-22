// firebase.ts
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  Auth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage, FirebaseStorage } from "@firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

class FirebaseService {
  private static instance: FirebaseService;
  public app: FirebaseApp;
  public auth: Auth;
  public db: Firestore;
  public storage: FirebaseStorage;

  private constructor() {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
      this.auth = initializeAuth(this.app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
    } else {
      this.app = getApp();
      this.auth = getAuth(this.app);
    }

    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}

export const firebase = FirebaseService.getInstance();
