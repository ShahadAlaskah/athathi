'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

type LanguageContextType = {
    language: string;
    toggleLanguage: () => void;
    t: (key: string, variables?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType>({
    language: 'ar',
    toggleLanguage: () => { },
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('ar');

    useEffect(() => {
        // Load language preference from localStorage on mount
        const storedLang = localStorage.getItem('language');
        if (storedLang && (storedLang === 'ar' || storedLang === 'en')) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        // Update document attributes dynamically
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
    };

    const t = (key: string, variables?: Record<string, string | number>) => {
        const dictionary = translations[language] || translations['ar'];
        let text = dictionary[key] || key;

        if (variables) {
            Object.keys(variables).forEach((variableKey) => {
                text = text.replace(`{${variableKey}}`, String(variables[variableKey]));
            });
        }
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
