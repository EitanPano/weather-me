import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useForm } from '../hooks/useForm';

import { SuggestList } from './SuggestList';


export const SearchBar = (props) => {

    const [searchTerm, handleChange] = useForm({term: ''})
    const debouncedSearchTerm = useDebounce(searchTerm, 750);

    useEffect(async () => {
        props.onChangeSearch(searchTerm)
    }, [debouncedSearchTerm]);

    const { term } = searchTerm
    return (
        <div className='search-bar'>
            <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="term"></label>
                <input
                    value={term}
                    onChange={handleChange}
                    id="term"
                    name="term"
                    type="search"
                    placeholder="Search City"
                />
            </form>
            <SuggestList onSelect={props.onSetLocation} suggestions={props.suggestions}></SuggestList>
        </div>
    );
};
