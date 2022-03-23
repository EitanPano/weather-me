import { SuggestPreview } from './SuggestPreview';

export function SuggestList({ suggestions, onSelect }) {
    if (!suggestions) return null;
    return (
        <ul>
            {suggestions.map((suggestion) => (
                <SuggestPreview
                    onSelect={onSelect}
                    suggestion={suggestion}
                    key={suggestion._id}
                ></SuggestPreview>
            ))}
        </ul>
    );
}
