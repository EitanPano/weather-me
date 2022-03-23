import { locationService } from '../../services/locationService';
import { accuWeatherAPI } from '../../services/externalAPIService';

export function loadLocations() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().locationModule;
        try {
            const locations = await locationService.query(filterBy);
            dispatch({ type: 'LOAD_LOCATIONS', locations });
        } catch (err) {
            console.log(err);
        }
    };
}

export function loadSuggestions() {
    return async (dispatch) => {};
}

export function setLocation(locationId) {
    return async (dispatch) => {
        if (!locationId) return;
        console.log('locationId: ', locationId);
        const location = await locationService.getById(locationId);
        console.log('location: ', location);
        if (!location) {
            console.log('No Location Found.');
            try {
                const newLocation = await accuWeatherAPI.getLocation(locationId);
                console.log('newLocation: ', newLocation);
                locationService.save(newLocation)
                dispatch({type: 'SET_LOCATION', newLocation})
            } catch (err) {
                console.log(err);
            }
        }
    };
}

export function getLocationById(locationId) {
    return async () => {
        return await locationService.getById(locationId);
    };
}

export function saveLocation(location) {
    return async (dispatch) => {
        try {
            const newLocation = await locationService.save({ ...location });
            if (location._id)
                dispatch({ type: 'UPDATE_LOCATION', location: newLocation });
            else dispatch({ type: 'ADD_LOCATION', location: newLocation });
        } catch (err) {
            console.log(err);
        }
    };
}

export function removeLocation(locationId) {
    return async (dispatch) => {
        try {
            locationService.remove(locationId);
            dispatch({ type: 'REMOVE_LOCATION', locationId });
        } catch (err) {
            console.log(err);
        }
    };
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy });
    };
}
