import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import { setLocation } from '../store/actions/locationActions';
import { accuWeatherAPI } from '../services/accuWeatherService';

import { LocationDetails } from './LocationDetails';

import { SearchBar } from '../cmps/SearchBar';
import { Loading } from '../cmps/Loading';


export const Home = () => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState(null);
    
    useEffect(async () => {
        // console.log('locationId: ', locationId);
        dispatch(setLocation());
    }, []);

    async function onChangeSearch(term) {
        const newSuggestions = await accuWeatherAPI.getSuggestions(term);
        setSuggestions(newSuggestions);
    }

    function onSetLocation(locationEntry) {
        // dispatch(addLocation(location))
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
