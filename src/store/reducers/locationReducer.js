const INITIAL_STATE = {
    defaultLocation: {_id: 'f101', city: 'Tel-Aviv', temperature: 29 },
    locations: [],
    filterBy: null,
};

export const locationReducer = (state = INITIAL_STATE, action) => {
    console.log('action', action);
    switch (action.type) {

        case 'LOAD_LOCATIONS':
            return {
                ...state,
                locations: [...action.locations]
            };

        case 'LOAD_DEFAULT_LOCATION':
            return {
                ...state,
                defaultLocation: {...action.location}
            }

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
                locations: state.locations.filter((location) => location._id !== action.itemId)
            };


        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            };

        default:
            return state;
    }
};
