/* eslint-disable */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../misc/firebase';

import { transformToArrWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');

    roomListRef.on('value', snapshot => {
      const data = transformToArrWithId(snapshot.val());
      setRooms(data);
    });

    // Unsubscribe from the snapshot listenere above
    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

// create a hook to get the rooms by calling 'useRooms()'
export const useRooms = () => useContext(RoomsContext);
