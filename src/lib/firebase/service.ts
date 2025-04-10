import { addDoc, collection, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import { doc } from "firebase/firestore/lite";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data
};

export async function signIn(userData: {email: string}) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if(data) {
        return data[0];
    } else {
        return null;
    }
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data
};

export async function signUp(userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
}, callback: Function) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if(data.length > 0) {
        callback({status: false, message: "Email already exist"});
    } else {
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = "member";
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({status: true, message: "Register success"});
        }).catch((err) => {
            callback({status: false, message: err.message});
        });
        callback({status: true, message: "Register success"});
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signInWithGoogle(userData: any, callback: any) {
    const q = query(collection(firestore, "users"), where("email", "==", userData.email));
    const snapshot = await getDocs(q);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if(data.length > 0) {
        userData.role = data[0].role;
        await updateDoc(doc(firestore, "users", data[0].id), userData).then(() => {
            callback({status: true, message: "Sign in with google success", data: userData});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).catch((err) => {
            callback({status: false, message: "Sign in with google failed"});
        });
    } else {
        userData.role = "member";
        await addDoc(collection(firestore, "users"), userData).then(() => {
            callback({status: true, message: "Sign in with google success", data: userData});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).catch((err) => {
            callback({status: false, message: "Sign in with google failed"});
        });
    }
}