import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDefaultLocation } from '../store/actions/locationActions';

import { Loading } from '../cmps/Loading';
import { useForm } from '../hooks/useForm';

export const Home = () => {
    const dispatch = useDispatch();
    const [searchTerm, handleChange] = useForm({term: ''}, getAutoComplete)
    const { defaultLocation } = useSelector((state) => state.locationModule);

    useEffect(async () => {
        dispatch(loadDefaultLocation());
    }, []);

    function getAutoComplete() {
        console.log(searchTerm);
    }



    const { term } = searchTerm
    if (!defaultLocation) return <Loading></Loading>;
    return (
        <div>
            <h1>Home-Page</h1>
            <form action="">
                <label htmlFor="term"></label>
                <input
                    value={term}
                    onChange={handleChange}
                    id="term"
                    name="term"
                    type="search"
                    placeholder="Search"
                />
            </form>
            <h2>{JSON.stringify(defaultLocation)}</h2>
        </div>
    );
};
