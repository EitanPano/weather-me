import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../cmps/Loading';
import { DayList } from '../cmps/DayList';
import { getLocationById, removeLocation, saveLocation } from '../store/actions/locationActions';
import { weatherIcons } from '../services/accuWeatherService';
import { setUserMessage } from '../store/actions/userActions';
import { eventBusService } from '../services/eventBusService';

export const LocationDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedLocation, isMetric } = useSelector((state) => state.locationModule);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(async () => {
        if (!selectedLocation) return;
        const location = await dispatch(getLocationById(selectedLocation._id));
        setIsFavorite(location ? true : false);
    }, [selectedLocation]);

    const toggleIsFavorite = async () => {
        // await dispatch(getLocationById(selectedLocation._id));
        setIsFavorite(isFavorite ? false : true);
        return isFavorite ? onRemoveLocation(selectedLocation._id) : onAddLocation(selectedLocation);
    };

    if (!selectedLocation) return <Loading></Loading>;

    const getTemperature = () => {
        const { temperature } = selectedLocation;
        return isMetric
            ? temperature.celsius + '°c'
            : temperature.fahrenheit + '°f';
    };

    const onAddLocation = () => {
        dispatch(saveLocation(selectedLocation));
        const text = `${selectedLocation.cityName} added to Favorites, View it`
        dispatch(setUserMessage({text, cbFunc: ()=> navigate('/favorite')}))
        // eventBusService.emit('showMsg', {
        //     text,
        //     cbFunc:()=>navigate('/favorite')
        // })
    };
    
    const onRemoveLocation = () => {
        dispatch(removeLocation(selectedLocation._id));
        const text = `${selectedLocation.cityName} is removed from Favorites`
        dispatch(setUserMessage({text}))
        // eventBusService.emit('showMsg', {text})
    };

    const { cityName, countryID, dailyForecasts, currentWeatherText, weatherIcon, } = selectedLocation;
    return (
        <section className="location-details">
            <header>
                <div className='current-weather'>
                    <img className="icon-weather medium" src={weatherIcons[weatherIcon]} alt="weather-icon" />
                    <h3>
                        <span>{countryID} - {cityName}</span>
                        <span>{getTemperature()}</span>
                    </h3>
                </div>
                <div className='actions'>
                    <label className={isFavorite ? 'btn-star on' : 'btn-star off'} htmlFor="location-like">★</label>
                    <input className='btn' hidden={isFavorite} onClick={toggleIsFavorite} name="location-like" id="location-like" value={ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' } type="button" />
                </div>
            </header>

            <h2>{currentWeatherText}</h2>

            <DayList days={dailyForecasts}></DayList>
        </section>
    );
};
