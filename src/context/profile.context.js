/* eslint-disable */
import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';

import { auth, database } from '../misc/firebase';

// We'll create two constants which we will write to
// the Realtime database when this device is offline
// or online.
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;

    // allows us to subscribe to currently sign-in users
    const authUnsubscribe = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        // Create a reference to this user's specific status node.
        // This is where we will store data about being online/offline.
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);

        userRef.on('value', snapshot => {
          const { name, createdAt, avatar } = snapshot.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(data);
          setIsLoading(false);
        });

        // Create a reference to the special '.info/connected' path in
        // Realtime Database. This path returns `true` when connected
        // and `false` when disconnected.
        database.ref('.info/connected').on('value', snapshot => {
          // If we're not currently connected, don't do anything.
          if (snapshot.val() === false) {
            return;
          }

          // If we are currently connected, then use the 'onDisconnect()'
          // method to add a set which will only trigger once this
          // client has disconnected by closing the app,
          // losing internet, or any other means.
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              // The promise returned from .onDisconnect().set() will
              // resolve as soon as the server acknowledges the onDisconnect()
              // request, NOT once we've actually disconnected:
              // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

              // We can now safely set ourselves as 'online' knowing that the
              // server will mark us as offline once we lose connection.
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef)
          //  unsubscribe from the .on() above
          userRef.off();

        if (userStatusRef) userStatusRef.off();

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
    });

    // Clean up function
    return () => {
      authUnsubscribe();

      if (userRef) userRef.off();

      if (userStatusRef) userStatusRef.off();

      database.ref('.info/connected').off();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

// To simplify the use of the context above,
// I can just create the following hook below:
export const useProfile = () => useContext(ProfileContext);
