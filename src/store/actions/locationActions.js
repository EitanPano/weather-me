import { locationService } from '../../services/locationService';
import { accuWeatherService } from '../../services/accuWeatherService';
// import { accuWeatherApi } from '../../services/accuWeatherApi';

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

export function setLocation(locationEntry = accuWeatherService.getDefaultLocation()) {
    return async (dispatch) => {
        if (!locationEntry || !locationEntry._id) return;
        let location = await accuWeatherService.getById(locationEntry._id);
        if (!location) {
            try {
                location = await accuWeatherService.getLocation(locationEntry);
                accuWeatherService.save(location);
            } catch (err) {
                console.log(err);
            }
        }
        dispatch({ type: 'SET_LOCATION', location });
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

export function toggleMetric() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_METRIC' });
    };
}



export function removeLocation(locationId) {
    return (dispatch) => {
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
