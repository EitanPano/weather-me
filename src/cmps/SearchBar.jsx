import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useForm } from '../hooks/useForm';

import { SuggestList } from './SuggestList';

export const SearchBar = (props) => {
    const [searchTerm, handleChange] = useForm({ term: '' });
    const debouncedSearchTerm = useDebounce(searchTerm, 750);
    const [isSuggestsShown, setIsSuggestsShown] = useState(false);

    useEffect(async () => {
        props.onChangeSearch(searchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handler = () => setIsSuggestsShown(false)
        document.body.addEventListener('click', handler)
        return () => {
            document.body.removeEventListener('click', handler)
          }
    }, [])

    const onSelect = (locationEntry) => {
        setIsSuggestsShown(false);
        props.onSetLocation(locationEntry);
    };

    const { term } = searchTerm;
    return (
        <div  className="search-bar">
            <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()} onClick={(ev) => ev.stopPropagation()}>
                <label htmlFor="term"></label>
                <input
                    value={term}
                    onClick={() => setIsSuggestsShown(true)}
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
                isDisplayed={isSuggestsShown}
            ></SuggestList>
        </div>
    );
};
