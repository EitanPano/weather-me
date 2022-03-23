import { lasso } from './localAsyncStorageService';

export const locationService = {
    query,
    getById,
    save,
    remove,
    getEmptyLocation,
};

const ITEM_KEY = 'locations';

const defaultLocations = [
    {
        _id: 'f101',
        name: 'Gold Sword', 
        temperature: 25,
    },
    {
        _id: 'f102',
        name: 'Iron Chestplate',
        price: 10,
    },
    {
        _id: 'f103',
        name: 'Ruby Amulet',
        price: 35,
    },
];

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
    let locations = await lasso.query(ITEM_KEY);
    if (!locations.length) locations = _loadLocations()
    if (filterBy) {
        locations = _filter(filterBy, locations);
    }
    return Promise.resolve([...locations]);
}

export async function getById(id) {
    const location = await lasso.get(ITEM_KEY ,id)
    return location ? { ...location } : null;
}

function save(location) {
    return (location._id) ? _updateLocation(location) : _addLocation(location);
}

async function _addLocation(location) {
    const newLocation = await lasso.post(ITEM_KEY, location);
    return newLocation;
}

async function _updateLocation(location) {
    const newLocation = await lasso.put(ITEM_KEY, location)
    return newLocation;
}

function remove(id) {
    lasso.remove(ITEM_KEY, id);
}

export function getEmptyLocation() {
    return {
        name: '',
        price: 99,
        type: '',
    };
}

function _loadLocations() {
    let locations = JSON.parse(localStorage.getLocation(ITEM_KEY));
    if (!locations || !locations.length) locations = defaultLocations;
    localStorage.setLocation(ITEM_KEY, JSON.stringify(locations));
    return locations;
}
