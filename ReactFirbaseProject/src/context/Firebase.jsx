import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut



} from 'firebase/auth'
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where
} from 'firebase/firestore'; getDownloadURL
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyCaa7T6gACraxQRXKHt2BNtZT9vBFtr_Yc",
    authDomain: "bookify-web-app.firebaseapp.com",
    projectId: "bookify-web-app",
    storageBucket: "bookify-web-app.appspot.com",
    messagingSenderId: "911463077230",
    appId: "1:911463077230:web:5e18954d40f016bf169d7f"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);



export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            // console.log('User',user)
            if (user) setUser(user);
            else setUser(null)
        });


    }, []);

    const signupUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUserWithEmailAndPAssword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);


    console.log(user);
    const handleCreateNewListing = async (name, isbnNumber, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);

        return await addDoc(collection(firestore, 'books'), {
            name,
            isbnNumber,
            price,
            imageURL: uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,

        });
    };

    const listAllBooks = () => {
        return getDocs(collection(firestore, 'books'));
    };

    const getBookId = async (id) => {
        const docRef = doc(firestore, 'books', id);
        const result = await getDoc(docRef);
        return result;
    };
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));

    };

    const placeOrder = async (bookid, qty) => {

        const collectionRef = collection(firestore, 'books', bookid, 'orders');
        const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
        });
        return result;
    };

    const fetchMyBooks = async (userId) => {

        // if(!user) return null yaha se check krn ah 


        const collectionRef = collection(firestore, 'books');
        const q = query(collectionRef, where('userID', '==', userId));

        const result = await getDocs(q);
        console.log(result);
        return result;



    };

    const getOrders = async (bookid) => {
        const collectionRef = collection(firestore, 'books', bookid, 'orders');
        const result = await getDocs(collectionRef);
        return result;
    }

    const signOutUser = () => {
        signOut(firebaseAuth);
        //   .then(() => {
        //     setUser(null);
        //   })
        //   .catch((error) => {
        //     console.log("Error signing out:", error);
        //   });
    };


    const isLoginIn = user ? true : false;


    return <FirebaseContext.Provider value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPAssword,
        signInWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookId,
        placeOrder,
        fetchMyBooks,
        getOrders,
        signOutUser,
        isLoginIn,
        user,

    }}>
        {props.children}
    </FirebaseContext.Provider>

};
