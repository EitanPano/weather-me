const INITIAL_STATE = {
    defaultLocation: null,
    selectedLocation: null,
    likedLocations: [],
    filterBy: null,
    isMetric: true,
};

export const locationReducer = (state = INITIAL_STATE, action) => {
    console.log('action', action);
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                ...state,
                selectedLocation: {...action.location}
            }

        case 'LOAD_LOCATIONS':
            return {
                ...state,
                likedLocations: [...action.likedLocations]
            };

        case 'ADD_LOCATION':
            return {
                ...state,
                likedLocations: [...state.likedLocations, action.location]
            };

        case 'UPDATE_LOCATION':
            return {
                ...state,
                likedLocations: state.likedLocations.map((location) => location._id === action.location._id ? action.location : location)
            };

        case 'REMOVE_LOCATION':
            return {
                ...state,
                likedLocations: state.likedLocations.filter((location) => location._id !== action.itemId)
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
