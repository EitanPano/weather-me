// import { useNavigate } from 'react-router-dom';

export function SuggestPreview({ suggestion, onSelect }) {
    // const navigate = useNavigate();

    // const onDetails = (suggestId) => navigate(`/location/${suggestId}`);

    if (!suggestion) return null;

    return (
        <li onClick={() => onSelect(suggestion)}>
            <p>City: {suggestion.cityName}</p>
        </li>
    );
}
