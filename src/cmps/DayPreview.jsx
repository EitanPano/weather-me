import { useSelector } from "react-redux";
import { weatherIcons } from "../services/accuWeatherService";


export function DayPreview({ day }) {
    const {isMetric} = useSelector((state) => state.locationModule)

    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return days[date.getDay()].substring(0, 3);
    };
      
    if (!day) return null;

    const { atDay, atNight, temperature, date } = day;
    const { maximum, minimum } = temperature;
    return (
        <li>
            <p>{getDayName(date)}</p>

            <p>Day : {isMetric ? maximum.celsius : maximum.fahrenheit}°</p>
            <img src={weatherIcons[atDay.icon]} alt={atDay.weatherText} />
            <p>{atDay.weatherText}</p>
            <p>Night : {isMetric ? minimum.celsius : minimum.fahrenheit}°</p>
            <img src={weatherIcons[atNight.icon]} alt={atNight.weatherText} />
            <p>{atNight.weatherText}</p>
        </li>
    );
}
