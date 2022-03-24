import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../cmps/Loading';
import { DayList } from '../cmps/DayList';
import { getLocationById, removeLocation, saveLocation } from '../store/actions/locationActions';
import { weatherIcons } from '../services/accuWeatherService';

export const LocationDetails = () => {
    const { selectedLocation, isMetric } = useSelector((state) => state.locationModule);
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite ] = useState(false)
    
    useEffect(async () => {
        // const { selectedLocation } = useSelector((state) => state.locationModule);
        if (!selectedLocation) return
        const location = await dispatch(getLocationById(selectedLocation._id))
        setIsFavorite(location ? true : false)
    }, [selectedLocation])

    const toggleIsFavorite = async () => {
        await dispatch(getLocationById(selectedLocation._id))
        setIsFavorite(isFavorite ? false : true)
        return (isFavorite)
        ? onRemoveLocation(selectedLocation._id)
        : onAddLocation(selectedLocation)
    }
     
    if (!selectedLocation) return <Loading></Loading>;

    const getTemperature = () => {
        const { temperature } = selectedLocation;
        return isMetric ? temperature.celsius : temperature.fahrenheit;
    };

    const onAddLocation = () => {
        dispatch(saveLocation(selectedLocation));
        console.log('Location Added to Favorites');
    };

    const onRemoveLocation = () => {
        dispatch(removeLocation(selectedLocation._id));
        console.log('Location Removed from Favorites');
    };

    const { cityName, countryID, dailyForecasts, currentWeatherText, weatherIcon } = selectedLocation;
    return (
        <section className="location-details">
            <header>
                <div>
                    <img className="weather-icon" src={weatherIcons[weatherIcon]} alt="" />
                    <h3>{countryID} - {cityName} <span>{getTemperature()}°</span></h3>
                </div>
                <div>
                    <label className={isFavorite ? 'icon-liked' : 'icon-unliked'} htmlFor="location-like" ></label>
                    <input onClick={toggleIsFavorite} name="location-like" id="location-like" value={ isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} type="button" />
                </div>
            </header>

            <h2>{currentWeatherText}</h2>

            <DayList days={dailyForecasts}></DayList>
        </section>
    );
};
