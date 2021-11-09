import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { 
     getAuth,
     GoogleAuthProvider,
     signInWithPopup,
     createUserWithEmailAndPassword,
     updateProfile,
     signOut,
     getIdToken,
     onAuthStateChanged, 
     signInWithEmailAndPassword 
    } from "firebase/auth";


// initiallize app 
initializeFirebase();

const useFirbase = () =>{
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');
    
    const  auth = getAuth();
    const googleProvider = new GoogleAuthProvider()

    const registerUser = (email, password, name, history)=>{
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
             setAuthError('');
             const newUser = {email, displayName: name};
            //  save user to database
            saveUser(email, name, 'POST')
             setUser(newUser);
            //  send name to firebase after creation 
            updateProfile(auth.currentUser, {
                displayName: name,
              }).then(() => {
                
              }).catch((error) => {
               
              });
             history.replace('/')
            })
            .catch((error) => {
                
                 setAuthError(error.message);
                // ..
            })
            .finally(()=> setIsLoading(false));

    }

    const loginUser = (email,password, location, history)=>{
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination)
                setAuthError('')
            })
            .catch((error) => {
               
                setAuthError(error.message);
            })
            .finally(()=> setIsLoading(false));

    }

    // google auth 
    const signInWithGoogle = (location, history)=>{
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
               
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                const destination = location?.state?.from || '/';
                history.replace(destination)
                setAuthError('')
            }).catch((error) => {
               
                setAuthError(error.message);
            })
            .finally(()=> setIsLoading(false));

    }

    // observer user state 
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              getIdToken(user)
              .then(idToken =>{
                  setToken(idToken)
              })
            } else {
              setUser({})
            }
            setIsLoading(false)
          });
          return ()=> unsubscribe;
    },[auth]);

    useEffect( () =>{
        fetch(`https://aqueous-mesa-83166.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => setAdmin(data.admin))

    },[user.email])



    const logOut = () =>{
        setIsLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            setAuthError(error)
          })
          .finally(()=> setIsLoading(false));
    }

    const saveUser = (email, displayName, method)=>{
        const user = {email, displayName};
        fetch('https://aqueous-mesa-83166.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

    }

    return {
        authError,
        admin,
        isLoading,
        user,
        token,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut,
    }

}

export default useFirbase;