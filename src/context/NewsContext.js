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
    const [newsFromFourth, setNewsFromFourth] = useState([]);


    useEffect(() => {
        const getNews = async () => {
          const data = await getDocs(collection(db, "news"));
          console.log(data);
          setNews(
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        };
        setIsLoading(false);
        getNews();
        setNewsFromFourth(news)
      }, []);
      // console.log(news);

    const value = { news, setNews, isLoading, newsFromFourth }
    return (
        <NewsContext.Provider value={value}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default NewsContextProvider