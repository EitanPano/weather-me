import { DayPreview } from './DayPreview';

export function DayList({ days }) {   
    if (!days) return null;
    return (
        <ul>
            {days.map((day, idx) => (
                <DayPreview day={day} key={idx}></DayPreview>
                ))}
        </ul>
    );
}
