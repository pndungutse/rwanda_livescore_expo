import React, { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { NewsScreen } from '../screens';
import { ref as sRef, getDownloadURL } from 'firebase/storage';



export const FixturesContext = createContext();

function FixturesContextProvider(props){
    const [firstDivisionFixtures, setFirstDivisionFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);

    const getFirstDivionFixtures = async () => {
      try {
        // const dateSelected = '2019-01-05'
        const data = await getDocs(collection(db, "year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/match_day/xuI3Ay7X8DP5niUNpQbz/fixtures"))
        // console.log(data);
        setFirstDivisionFixtures(
            data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })),
        // setTimeout(news, 1500)
      )
      setRefresh(false)
      } catch (err) {
        setError(err.toString())
      }
      
    };
    useEffect(() => {
        getFirstDivionFixtures();
        setIsLoading(false);
      }, []);
    //   console.log(fixtures);

    const value = { firstDivisionFixtures, setFirstDivisionFixtures, isLoading, error, refresh, setRefresh, getFirstDivionFixtures }
    return (
        <FixturesContext.Provider value={value}>
            {props.children}
        </FixturesContext.Provider>
    )
}

export default FixturesContextProvider