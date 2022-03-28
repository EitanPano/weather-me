const INITIAL_STATE = {
    defaultLocation: null,
    selectedLocation: null,
    locations: [],
    filterBy: null,
    isMetric: true,
};

export const locationReducer = (state = INITIAL_STATE, action) => {
    // console.log('action', action);
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                ...state,
                selectedLocation: {...action.location}
            }

        case 'LOAD_LOCATIONS':
            return {
                ...state,
                locations: [...action.locations]
            };

        case 'ADD_LOCATION':
            return {
                ...state,
                locations: [...state.locations, action.location]
            };

        case 'UPDATE_LOCATION':
            return {
                ...state,
                locations: state.locations.map((location) => location._id === action.location._id ? action.location : location)
            };

        case 'REMOVE_LOCATION':
            return {
                ...state,
                locations: state.locations.filter((location) => location._id !== action.locationId)
            };

        case 'TOGGLE_METRIC':
            return {
                ...state,
                isMetric: state.isMetric ? false : true
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            };

        default:
            return state;
    }
};
