import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, database } from '../misc/firebase'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let userRef;

        // allows us to subscribe to currently sign-in users
        const authUnsubscribe = auth.onAuthStateChanged(authObj => {
            if (authObj) {

                userRef = database.ref(`/profiles/${authObj.uid}`)

                userRef.on('value', snapshot => {
                    const { name, createdAt } = snapshot.val()

                    const data = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email
                    }

                    setProfile(data)
                    setIsLoading(false)
                })

            }
            else {
                if (userRef)
                    //  unsubscribe from the .on() above
                    userRef.off()

                setProfile(null)
                setIsLoading(false)
            }
        })

        // Clean up function
        return () => {
            authUnsubscribe()

            if (userRef)
                userRef.off()
        }
    }, [])

    return (
        <ProfileContext.Provider value={{ profile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    )

}

// To simplify the use of the context above, 
// I can just create the following hook below:
export const useProfile = () => useContext(ProfileContext)