import React from 'react';
import { useSelector } from 'react-redux';
import { weatherIcons } from '../services/accuWeatherService';

export const LocationPreview = ({ location, onSetLocation, onRemove }) => {

    const { isMetric } = useSelector((state) => state.locationModule);

    

    const { temperature } = location;
    return (
        <li onClick={() => onSetLocation(location)} className='location-preview'>
            <button onClick={()=>onRemove(location._id)} className='btn-close'>✖</button>
            <header>
                <h3>{location.cityName}</h3>
                <p>{location.countryName}</p>
                <p>{isMetric ? temperature.celsius : temperature.fahrenheit}°</p>
                <img src={weatherIcons[location.weatherIcon]} alt="" />
                <p>{location.currentWeatherText}</p>
            </header>
            <p>{}</p>
            <p>{}</p>
            <p>{}</p>
        </li>
    );
};
