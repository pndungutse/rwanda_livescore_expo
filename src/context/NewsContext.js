import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import { db, storage, app } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NewsScreen } from '../screens';
import { ref as sRef, getDownloadURL } from 'firebase/storage';



export const NewsContext = createContext();

function NewsContextProvider(props){
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newsFromFourth, setNewsFromFourth] = useState([]);


    useEffect(() => {
        const getNews = async () => {
          try {
            const data = await getDocs(collection(db, "news"))
              setNews(
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
            // setTimeout(news, 1500)
          )
          } catch (err) {
            setError(err.toString())
          }
          
        };
        setIsLoading(false);
        getNews();
        setNewsFromFourth(news)
      }, []);
      // console.log(news);

    const value = { news, setNews, isLoading, newsFromFourth, error }
    return (
        <NewsContext.Provider value={value}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsContextProvider