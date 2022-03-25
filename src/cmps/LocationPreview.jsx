import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { weatherIcons } from '../services/accuWeatherService';
import { useWindowSize } from '../hooks/useWindowSize'

export const LocationPreview = ({ location, onSetLocation, onRemove }) => {
    const { isMetric } = useSelector((state) => state.locationModule);
    const { windowWidth } = useWindowSize()

    const isSmallWindow = () => {
        return (windowWidth <= 570) ? true : false;
    }

    const handleDelete = (ev) => {
        ev.stopPropagtion()
        onRemove(location._id)
    }

    useEffect(() => {
    }, [windowWidth])
    

    

    const { temperature } = location;
    return (
        <li onClick={() => handleDelete} className='location-preview'>
            <button onClick={()=>onRemove(location._id)} className='btn-delete'>✖</button>
            <header>
                <h3>{location.cityName}</h3>
                <p>{location.countryName}</p>
                <p>{isMetric ? temperature.celsius : temperature.fahrenheit}°</p>
                <img src={weatherIcons[location.weatherIcon]} className='icon-weather' alt="weather-icon" />
                <p>{location.currentWeatherText}</p>
                <p className={isSmallWindow() ? 'hidden' : ''}>{location.forecastText}</p>
            </header>
        </li>
    );
};
