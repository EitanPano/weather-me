import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../hooks/useWindowSize';
import { weatherIcons } from '../services/accuWeatherService';

export function DayPreview({ day }) {
    const { isMetric } = useSelector((state) => state.locationModule);
    const { windowWidth } = useWindowSize()

    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return (windowWidth > 500) ? days[date.getDay()] : days[date.getDay()].substring(0,3);
    };

    useEffect(() => {
    }, [windowWidth])
    

    if (!day) return null;

    const { atDay, atNight, temperature, date } = day;
    const { maximum, minimum } = temperature;
    return (
        <li className="day-preview">
            <h4>{getDayName(date)}</h4>
            <div className='description'>
                <article>
                    <p>
                        <span>Day - </span>
                        <span>{isMetric ? maximum.celsius : maximum.fahrenheit}°</span>
                    </p>
                    <img className='icon-weather small' src={weatherIcons[atDay.icon]} alt={atDay.weatherText} />
                    <p>{atDay.weatherText}</p>
                </article>
                <article>
                    <p>
                        <span>Night - </span>
                        <span>{isMetric ? minimum.celsius : minimum.fahrenheit}°</span>
                    </p>
                    <img className='icon-weather small' src={weatherIcons[atNight.icon]} alt={atNight.weatherText} />
                    <p>{atNight.weatherText}</p>
                </article>
            </div>
        </li>
    );
}
