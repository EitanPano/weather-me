import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useForm } from '../hooks/useForm';

import { SuggestList } from './SuggestList';

export const SearchBar = (props) => {
    const [searchTerm, handleChange] = useForm({ term: '' });
    const debouncedSearchTerm = useDebounce(searchTerm, 750);
    const [isResultsShown, setIsResultsShown] = useState(false);

    useEffect(async () => {
        props.onChangeSearch(searchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handler = () => setIsResultsShown(false)
        document.body.addEventListener('click', handler)
        return () => {
            document.body.removeEventListener('click', handler)
          }
    }, [])

    const onSelect = (locationEntry) => {
        setIsResultsShown(false);
        props.onSetLocation(locationEntry);
    };

    const { term } = searchTerm;
    return (
        <div onClick={(ev) => ev.stopPropagation()} className="search-bar">
            <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="term"></label>
                <input
                    value={term}
                    onClick={() => setIsResultsShown(true)}
                    onChange={handleChange}
                    id="term"
                    name="term"
                    type="search"
                    placeholder="Search City"
                />
            </form>
            <SuggestList
                onSelect={onSelect}
                suggestions={props.suggestions}
                isDisplayed={isResultsShown}
            ></SuggestList>
        </div>
    );
};
