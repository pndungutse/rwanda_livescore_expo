import React, { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { NewsScreen } from '../screens';
import { ref as sRef, getDownloadURL } from 'firebase/storage';



export const NeedsContext = createContext();

function NeedsContextProvider(props){
    const [document, setDocument] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [textTest, setTextTest] = useState(true);
    // const [newsFromFourth, setNewsFromFourth] = useState([]);

    // const testText = "Hello World";
    const getNeed = async () => {
        try {
          const documentRef = await doc(db, 'news', 'HvXow1htm69a0pqFucm5');
          // console.log(q);
          const data = await getDoc(documentRef);
          console.log(data);
        //     setNews(
        //   data.docs.map((doc) => ({
        //     ...doc.data(),
        //     id: doc.id,
        //   })),
        //   // setTimeout(news, 1500)
        // )
        setRefresh(false)
        } catch (err) {
          setError(err.toString())
        }   
      };
        
    useEffect(() => {
        // const documentRef = doc(db, 'needs', 'HvXow1htm69a0pqFucm5');
        // getDoc(documentRef).then((doc) => {
        //     console.log(doc.data())
        // })
        getNeed();
      }, []);
      // console.log(news);

    const value = { getNeed }
    return (
        <NeedsContext.Provider value={value}>
            {props.children}
        </NeedsContext.Provider>
    )
}

export default NeedsContextProvider