import { createContext, useEffect, useState } from "react";

import * as excursionService from '../services/excursionService';
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [excursions, setExcursions] = useState([]);
    const [filteredExcursions, setFilteredExcursions] = useState([]);

    useEffect(() => {
        excursionService.getAll()
            .then(excursions => {
                setExcursions(excursions);
                setFilteredExcursions(excursions);
            });
    }, []);

    const filterExcursions = (text) => {
        setFilteredExcursions(excursions.filter(x => x.title.toLowerCase().includes(text.toLowerCase())));
        console.log(filteredExcursions)
    }

    return (
        <SearchContext.Provider value={{ filteredExcursions, filterExcursions }}>
            {children}
        </SearchContext.Provider>
    );
}