import React, { createContext, useState } from 'react';

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
    const [ surveys, setSurveys ] = useState([
        { id: 1, title: 'SECOMP 2023', date: '10/10/2023', uri: 'https://static.vecteezy.com/system/resources/thumbnails/044/812/078/small/sleek-desktop-computer-icon-on-a-transparent-background-png.png'},
        { id: 2, title: 'Ubuntu 2022', date: '05/06/2022', uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/dff60934335773.56cce1e574c01.png'},
        { id: 3, title: 'Meninas CPU', date: '01/04/2022', uri: 'https://meninas.sbc.org.br/wp-content/uploads/2023/06/image-removebg-preview-20-2.png' }
    ]);

    return (
        <SurveyContext.Provider value={{ surveys, setSurveys }}>
            {children}
        </SurveyContext.Provider>
    )
}