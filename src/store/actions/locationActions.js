import { locationService } from '../../services/locationService';
import { accuWeatherAPI } from '../../services/externalAPIService'

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

export function loadDefaultLocation() {
    return async (dispatch, getState) => {
        try {
            // const updatedLocation = await locationService.getDefault()
            const updatedLocation = await accuWeatherAPI.getLocation()
            console.log(updatedLocation);
            dispatch({type: 'LOAD_DEFAULT_LOCATION', location: updatedLocation})

        } catch(err) {
            console.log('err: ', err)
        }
    }
}

export function getLocationById(locationId) {
    return async () => {
        return await locationService.getById(locationId);
    };
}

export function saveLocation(location) {
    return async (dispatch) => {
        try {
            const newLocation = await locationService.save({...location});
            if (location._id) dispatch({ type: 'UPDATE_LOCATION', location: newLocation })
            else dispatch({ type: 'ADD_LOCATION', location: newLocation })
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
