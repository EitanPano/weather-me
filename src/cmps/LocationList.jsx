import React from 'react';

import { LocationPreview } from './LocationPreview';
import { Loading } from './Loading';

export const LocationList = ({ locations, onRemove, onSetLocation }) => {
    if (!locations) return <Loading></Loading>;
    return (
        <ul>
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
