// import { useNavigate } from 'react-router-dom';

export function SuggestPreview({ suggestion, onSelect }) {
    // const navigate = useNavigate();

    // const onDetails = (suggestId) => navigate(`/location/${suggestId}`);

    if (!suggestion) return null;

    const { _id, cityName } = suggestion
    return (
        <li onClick={() => onSelect(_id)}>
            <p>City: {cityName}</p>
        </li>
    );
}
