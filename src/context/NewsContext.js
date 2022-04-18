import React, { createContext } from 'react'
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NewsScreen } from '../screens';



export const NewsContext = createContext();

function NewsContextProvider(props){
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getNews = async () => {
          const data = await getDocs(collection(db, "news"));
          setNews(
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        };
        setIsLoading(false);
        getNews();
      }, []);

    const value = { news, setNews, isLoading }
    return (
        <NewsContext.Provider value={value}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsContextProvider