import { lasso } from './localAsyncStorageService';

export const locationService = {
    query,
    getById,
    save,
    remove,
};

const LOCATION_KEY = 'locations';

const defaultLocations = [];

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }
        return 0;
    });
}

function _filter(filterBy, locations) {
    const term = filterBy.term.toLowerCase() || '';
    const type = filterBy.type.toLowerCase() || '';
    const minPrice = filterBy.minPrice || 0;
    const maxPrice = filterBy.maxPrice || Infinity;
    return locations.filter((location) => {
        return (
            location.name.toLowerCase().includes(term) &&
            location.type.toLowerCase().includes(type) &&
            location.price >= minPrice &&
            location.price <= maxPrice
        );
    });
}

async function query(filterBy = null) {
    let locations = await lasso.query(LOCATION_KEY);
    if (!locations.length) locations = _loadLocations();
    if (filterBy) {
        locations = _filter(filterBy, locations);
    }
    return Promise.resolve([...locations]);
}

async function getById(id) {
    const location = await lasso.get(LOCATION_KEY, id);
    return location ? { ...location } : null;
}

function save(location) {
    return location._id ? _updateLocation(location) : _addLocation(location);
}

async function _addLocation(location) {
    const newLocation = await lasso.post(LOCATION_KEY, location);
    return {...newLocation};
}

async function _updateLocation(location) {
    const newLocation = await lasso.put(LOCATION_KEY, location);
    return {...newLocation};
}

async function remove(id) {
    await lasso.remove(LOCATION_KEY, id);
}

function _loadLocations() {
    let locations = JSON.parse(localStorage.getItem(LOCATION_KEY));
    if (!locations || !locations.length) locations = defaultLocations;
    localStorage.setItem(LOCATION_KEY, JSON.stringify(locations));
    return locations;
}