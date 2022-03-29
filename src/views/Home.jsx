import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { suggestionService } from '../services/suggestionService';
import { setLocation } from '../store/actions/locationActions';

import { LocationDetails } from './LocationDetails';
import { SearchBar } from '../cmps/SearchBar';
import { useGeolocation } from '../hooks/useGeolocation';

export const Home = () => {
    const dispatch = useDispatch();
    const [suggestions, setSuggestions] = useState(null);
    const { latitude, longitude } = useGeolocation()
    
    useEffect(() => {
        if (!latitude || !longitude) return
        dispatch(setLocation({lat: latitude, long: longitude}))
    }, [latitude, longitude])
    

    const onChangeSearch = async (term) => {
        const newSuggestions = await suggestionService.getSuggestionMap(term);
        setSuggestions(newSuggestions);
    }

    const onSetLocation = (locationEntry) => {
        dispatch(setLocation(locationEntry));
    }

    return (
        <div className="home">
            <h1 className='slogen'>Know the Weather</h1>
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
