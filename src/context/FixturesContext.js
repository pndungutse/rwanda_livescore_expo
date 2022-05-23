import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import { db} from '../config/firebase';
import { collection, getDocs, where, query, serverTimestamp, Timestamp } from 'firebase/firestore';

export const FixturesContext = createContext();

function FixturesContextProvider(props){
    const [firstDivisionFixtures, setFirstDivisionFixtures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [dateSelected, setDateSelected] = useState(new Date().setHours(0,0,0,0));

    function onDateSelected(date) {
      setDateSelected(date)
      fetchFixtures();
      getFirstDivionFixtures();
      console.log("Date Selected from context: "+dateSelected);

    }

    const fetchFixtures = () => {
      // setDateSelected(dateSelected);
      // getFirstDivionFixtures();
      setFirstDivisionFixtures(firstDivisionFixtures);
      setRefresh(false);
  }


    const getFirstDivionFixtures = async () => {
      try {
        const dateSearched1 = new Date()
        const dateSearched2 = new Date()
        dateSearched1.setDate(dateSearched1.getDate()+1)
        dateSearched2.setDate(dateSearched2.getDate()+1)

        dateSearched1.setHours(0,0,0,0);
        dateSearched2.setHours(23,59,59,999);

        const q = query(collection(db, "year/mLKbCVlBQRjpL9ZIjcVa/league/PAQcjUL3HZshWd8Xl1MU/match_day/xuI3Ay7X8DP5niUNpQbz/fixtures"), where('date','>=',dateSearched1), where('date', '<=', dateSearched2))
        const data = await getDocs(q);
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
    // console.log(firstDivisionFixtures);

    useEffect(() => {
        getFirstDivionFixtures();
        setIsLoading(false);
        onDateSelected();
        fetchFixtures();
      }, []);
    //   console.log(fixtures);

    const value = { firstDivisionFixtures, setFirstDivisionFixtures, isLoading, setIsLoading, error, refresh, setRefresh, getFirstDivionFixtures, dateSelected, setDateSelected, onDateSelected, fetchFixtures }
    return (
        <FixturesContext.Provider value={value}>
            {props.children}
        </FixturesContext.Provider>
    )
}

export default FixturesContextProvider