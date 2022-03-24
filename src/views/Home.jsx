import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { setLocation } from '../store/actions/locationActions';
import { accuWeatherService } from '../services/accuWeatherService';

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
        dispatch(setLocation(locationEntry))
    }

    return (
        <div>
            <h1>Home-Page</h1>
            <SearchBar
                onSetLocation={onSetLocation}
                onChangeSearch={onChangeSearch}
                suggestions={suggestions}
            ></SearchBar>
            <LocationDetails></LocationDetails>
        </div>
    );
};
