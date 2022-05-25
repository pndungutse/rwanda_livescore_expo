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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [testString, setTestString] = useState("testString");



    function onDateSelected(date) {
      fetchFixtures();
      getFirstDivionFixtures();

    }

    const fetchFixtures = () => {
      // setDateSelected(dateSelected);
      // getFirstDivionFixtures();
      setFirstDivisionFixtures(firstDivisionFixtures);
      setRefresh(false);
  }
        const startDateDate = new Date(startDate);
        const dateSearched1 = startDateDate;
        const endDateDate = new Date(endDate)
        const dateSearched2 = endDateDate;


    const getFirstDivionFixtures = async () => {
      try {
        // console.log("Start Selected from context: "+startDate);
        // console.log("End Selected from context: "+endDate);
        // console.log("My Test String in: "+testString);

        
        dateSearched1.setDate(dateSearched1.getDate())
        dateSearched2.setDate(dateSearched2.getDate())

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
        // onDateSelected();
        fetchFixtures();
        console.log(startDate);
      }, []);
    //   console.log(fixtures);

    const value = { firstDivisionFixtures, setFirstDivisionFixtures, isLoading, setIsLoading, error, refresh, setRefresh, getFirstDivionFixtures, startDate, setStartDate, endDate, setEndDate, fetchFixtures, testString, setTestString }
    return (
        <FixturesContext.Provider value={value}>
            {props.children}
        </FixturesContext.Provider>
    )
}

export default FixturesContextProvider