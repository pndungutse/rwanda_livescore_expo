import React, { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const HightlightContext = createContext();

function HightlightContextProvider(props){
    const [highlights, setHighlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const getHighlights = async () => {
          try {
            const data = await getDocs(collection(db, "highlight"))
              setHighlights(
                data.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                })),
            // setTimeout(highlights, 1500)
          )
          setRefresh(false)
          } catch (err) {
            setError(err.toString())
          }
          
        };
        setIsLoading(false);
        getHighlights();
      }, []);
      // console.log(highlights);

    const value = { highlights, setHighlights, isLoading, error, refresh, setRefresh }
    return (
        <HightlightContext.Provider value={value}>
            {props.children}
        </HightlightContext.Provider>
    )
}

export default HightlightContextProvider