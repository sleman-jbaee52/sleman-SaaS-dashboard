// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  query,
  orderBy,
  limit,
  DocumentData,
  FirestoreDataConverter,
  DocumentSnapshot,
} from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

// Firebase Configuration - ضع قيمك هنا
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
} as any; // Type assertion for env vars

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Types

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  subscriptionPlan: "starter" | "professional" | "enterprise";
  projectsCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
}

// Firestore Converter
const userProfileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(userProfile: UserProfile): DocumentData {
    return userProfile;
  },
  fromFirestore(snapshot: DocumentSnapshot<DocumentData>): UserProfile {
    const data = snapshot.data()!;
    return {
      uid: data.uid as string,
      email: data.email as string,
      displayName: (data.displayName as string) || "",
      photoURL: (data.photoURL as string) || "",
      subscriptionPlan: data.subscriptionPlan as
        | "starter"
        | "professional"
        | "enterprise",
      projectsCount: (data.projectsCount as number) || 0,
      createdAt: data.createdAt as Timestamp,
      updatedAt: data.updatedAt as Timestamp,
    };
  },
};

// Auth Functions
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    await setUserProfile(result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign In Error:", error);
    return null;
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setUserProfile(result.user);
    return result.user;
  } catch (error: any) {
    console.error("Email Sign Up Error:", error.code, error.message);
    throw error; // Propagate to caller
  }
};

export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return result.user;
  } catch (error: any) {
    console.error("Email Sign In Error:", error.code, error.message);
    throw error; // Propagate to caller
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// User Profile
export const setUserProfile = async (user: User): Promise<void> => {
  const userRef = doc(db, "users", user.uid).withConverter(
    userProfileConverter,
  );
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    subscriptionPlan: "starter",
    projectsCount: 0,
    createdAt: serverTimestamp() as unknown as Timestamp,
    updatedAt: serverTimestamp() as unknown as Timestamp,
  };
  await setDoc(userRef, profile, { merge: true });
};

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  const userRef = doc(db, "users", uid).withConverter(userProfileConverter);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data()!;
  }
  throw new Error("User profile not found");
};

export const updateUserSubscription = async (
  uid: string,
  plan: "starter" | "professional" | "enterprise",
): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    subscriptionPlan: plan,
    updatedAt: serverTimestamp(),
  });
};

// Auth Listener
export const onAuthStateChange = (
  callback: (user: User | null) => void,
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Projects
export const updateUserProjectsCount = async (uid: string): Promise<void> => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    projectsCount: increment(1),
    updatedAt: serverTimestamp(),
  });
};

export const createProject = async (
  uid: string,
  name: string,
  description: string,
): Promise<string> => {
  const projectRef = doc(collection(db, "users", uid, "projects"));
  await setDoc(projectRef, {
    name,
    description,
    createdAt: serverTimestamp() as unknown as Timestamp,
    updatedAt: serverTimestamp() as unknown as Timestamp,
  });
  return projectRef.id;
};

export const getUserProjects = async (uid: string): Promise<Project[]> => {
  const projectsQuery = query(
    collection(db, "users", uid, "projects"),
    orderBy("createdAt", "desc"),
    limit(10),
  );
  const snapshot = await getDocs(projectsQuery);

  return snapshot.docs.map((docSnapshot: DocumentSnapshot<DocumentData>) => {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      name: (data?.name as string) || "",
      description: (data?.description as string) || "",
      createdAt: (data?.createdAt as Timestamp) || Timestamp.now(),
    };
  });
};

export default app;
