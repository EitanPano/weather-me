import React from 'react';

import { LocationPreview } from './LocationPreview';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';

export const LocationList = ({ locations, onRemove, onSetLocation }) => {
    const navigate = useNavigate()

    if (!locations) return <Loading></Loading>;
    if (!locations.length) return <p className='error-msg'>No location found, You may add favorite locations from the <span className='bold pointer' onClick={() => navigate('/')}>Home</span> screen</p>
    return (
        <ul className='location-list grid-container'>
            {locations.map((location) => {
                return (
                    <LocationPreview
                        location={location}
                        onSetLocation={onSetLocation}
                        onRemove={onRemove}
                        key={location._id}
                    ></LocationPreview>
                );
            })}
        </ul>
    );
};
