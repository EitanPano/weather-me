
import { useEffect } from "react";

export function SuggestPreview({ suggestion, onSelect, isFirst }) {

    const handleFirstCmp = (ev) => {
        if (!isFirst) return;
        if (ev.key === 'Enter') return onSelect(suggestion);
    }

    useEffect(() => {
        if (!isFirst) return;
        document.addEventListener('keyup', handleFirstCmp)
        
        return () => {
            document.removeEventListener('keyup', handleFirstCmp)
          }
    }, [])



    if (!suggestion) return null;

    return (
        <li className="suggest-preview" onClick={() => onSelect(suggestion)}>
            <p>{suggestion.cityName}</p>
        </li>
    );
}
