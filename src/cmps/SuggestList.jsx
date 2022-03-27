import { useEffect } from 'react';
import { SuggestPreview } from './SuggestPreview';

export function SuggestList({ suggestions, onSelect, isDisplayed }) {
    if (!suggestions || isDisplayed === false) return null;

    return (
        <ul className="suggest-list">
            {suggestions.map((suggestion, idx) => (
                <SuggestPreview
                    onSelect={onSelect}
                    suggestion={suggestion}
                    isFirst={idx === 0 ? true : false}
                    key={suggestion._id}
                ></SuggestPreview>
            ))}
        </ul>
    );
}
