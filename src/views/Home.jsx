import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { accuWeatherService } from '../services/accuWeatherService';
import { setLocation } from '../store/actions/locationActions';

import { LocationDetails } from './LocationDetails';
import { SearchBar } from '../cmps/SearchBar';

export const Home = () => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState(null);

    async function onChangeSearch(term) {
        const newSuggestions = await accuWeatherService.getSuggestions(term);
        setSuggestions(newSuggestions);
    }

    function onSetLocation(locationEntry) {
        dispatch(setLocation(locationEntry));
    }

    return (
        <div className="home">
            <section className="search">
                <SearchBar
                    onSetLocation={onSetLocation}
                    onChangeSearch={onChangeSearch}
                    suggestions={suggestions}
                ></SearchBar>
            </section>
            <LocationDetails></LocationDetails>
        </div>
    );
};
