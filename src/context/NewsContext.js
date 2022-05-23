import React, { createContext } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { NewsScreen } from '../screens';
import { ref as sRef, getDownloadURL } from 'firebase/storage';



export const NewsContext = createContext();

function NewsContextProvider(props){
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [newsFromFourth, setNewsFromFourth] = useState([]);

const getNews = async () => {
          try {
            const q = await query(collection(db, "news"), orderBy('date_inserted', 'desc'));
            // console.log(q);
            const data = await getDocs(q);
            console.log(data);
              setNews(
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
        setIsLoading(false);
        setNewsFromFourth(news);
        getNews();
      }, []);
      // console.log(news);

    const value = { news, setNews, isLoading, newsFromFourth, error, refresh, setRefresh, getNews }
    return (
        <NewsContext.Provider value={value}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsContextProvider