import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadLocations, removeLocation, setLocation } from '../store/actions/locationActions';

import { LocationList } from '../cmps/LocationList';

export function Favorites() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { locations } = useSelector((state) => state.locationModule);

    useEffect(() => {
        dispatch(loadLocations());
    }, []);

    const onRemove = async (locationId) => {
        dispatch(removeLocation(locationId));
    };

    const onSetLocation = (location) => {
        dispatch(setLocation(location));
        navigate('/');
    };

    return (
        <div className='favorites'>
            <h1>Favorite Locations</h1>
            <div className='container'>
                <section className='weather-quote'>
                    <p className='quote'>"Wherever you go, no matter what the weather, always bring your own sunshine."</p>
                    <p className='author'>Anthony J. D'Angelo</p>
                </section>
                <LocationList
                    onSetLocation={onSetLocation}
                    onRemove={onRemove}
                    locations={locations}
                ></LocationList>
            </div>
        </div>
    );
}
