import { DayPreview } from './DayPreview';

export function DayList({ days }) {   
    if (!days) return null;
    return (
        <ul className='day-list grid-container'>
            {days.map((day, idx) => (
                <DayPreview day={day} key={idx}></DayPreview>
                ))}
        </ul>
    );
}
