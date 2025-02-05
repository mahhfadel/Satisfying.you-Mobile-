// src/context/SurveyContext.js

import React, { createContext, useState, useContext } from 'react';
import { db } from '../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchSurveys = async () => {
        if (!user) {
            console.log('User is not logged in.');
            setSurveys([]);
            return;
        }

        setLoading(true);
        try {
            const surveyCollectionRef = collection(db, 'surveys');
            const surveySnapshot = await getDocs(surveyCollectionRef);
            const surveyList = surveySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSurveys(surveyList);
            console.log('Fetched surveys:', surveyList);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SurveyContext.Provider value={{ surveys, setSurveys, loading, fetchSurveys }}>
            {children}
        </SurveyContext.Provider>
    );
};

export const useSurvey = () => {
    return useContext(SurveyContext);
};
