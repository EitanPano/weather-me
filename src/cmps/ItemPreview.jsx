import { useSelector } from "react-redux";


export function ItemPreview({ item }) {
    const {isMetric} = useSelector((state) => state.locationModule)

    const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return days[date.getDay()];
    };
      
    if (!item) return null;

    const { atDay, atNight, temperature, date } = item;
    const { maximum, minimum } = temperature;
    return (
        <li>
            <p>{getDayName(date)}</p>

            <p>Day : {isMetric ? maximum.celsius : maximum.fahrenheit}°</p>
            <p>{atDay}</p>
            <p>Night : {isMetric ? minimum.celsius : minimum.fahrenheit}°</p>
            <p>{atNight}</p>
        </li>
    );
}
