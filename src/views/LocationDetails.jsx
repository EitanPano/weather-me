import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../cmps/Loading';
import { ItemList } from '../cmps/ItemList';
import { saveLocation } from '../store/actions/locationActions';

export const LocationDetails = () => {
    const dispatch = useDispatch()
    const { selectedLocation, isMetric } = useSelector(
        (state) => state.locationModule
    );
    if (!selectedLocation) return <Loading></Loading>;

    const getTemperature = () => {
        return isMetric ? '10' : '40';
    };

    const onAddLocation = () => {
        console.log('Add Location to favorites');
        dispatch(saveLocation(selectedLocation))
    }

    const { cityName, countryID, dailyForecasts } = selectedLocation;
    return (
        <section className="location-details">
            <header>
                <div>
                    <img className="weather-icon" src="" alt="" />
                    <h3>
                        {countryID} - {cityName}{' '}
                        <span>{getTemperature()}°</span>
                    </h3>
                </div>
                <div>
                    <label className={true ? 'icon-liked' : 'icon-unliked'} htmlFor="location-like"></label>
                    <input onClick={onAddLocation} name='location-like' id='location-like' value={'Add to Favorites'} type="button" />
                </div>
            </header>

            <ItemList items={dailyForecasts} byKeys={false}></ItemList>
        </section>
    );
};
