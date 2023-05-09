import React, {useContext, useEffect, useState} from "react";
import { auth } from "../base";
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

//below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Login functionality 
    //  FIRST we instantiate a GitHubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authDate => {
            console.log(authDate)
            setCurrentUser(authDate.user)
        }))
    }

    //Logout fuctionallity 
    async function logout(){
        signOut(auth).then(setCurrentUser(null))
    }

    const value = {currentUser, login, logout}

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return authChange
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {/* Below we are waiting for the AuthContext info to populate before loading the children in the UI */}
            {!loading && children}
        </AuthContext.Provider>
    )
}