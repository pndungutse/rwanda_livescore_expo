import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import { db} from '../config/firebase';
import { collection, getDocs, where, query, serverTimestamp, Timestamp } from 'firebase/firestore';

export const StatisticsContext = createContext();

function StatisticsContextProvider(props){
    const [firstDivisionStandings, setFirstDivisionStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);

    const getFirstDivionStandings = async () => {
      try {
        

        const q = collection(db, "year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/standings")
        const data = await getDocs(q);
        setFirstDivisionStandings(
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
    // console.log(firstDivisionFixtures);
    

    useEffect(() => {
        getFirstDivionStandings();
        setIsLoading(false);
        // console.log(firstDivisionStandings);
      }, []);
    //   console.log(fixtures);

    const value = { firstDivisionStandings, setFirstDivisionStandings, isLoading, setIsLoading, error, refresh, setRefresh, getFirstDivionStandings}
    return (
        <StatisticsContext.Provider value={value}>
            {props.children}
        </StatisticsContext.Provider>
    )
}

export default StatisticsContextProvider