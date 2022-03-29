const INITIAL_STATE = {
    users: [],
    loggedInUser: {
        name: 'Muki',
        coins: 100,
        moves: [],
        isAdmin: true,
    },
};

export function userReducer(state = INITIAL_STATE, action) {
    const { loggedInUser } = state;
    switch (action.type) {
        case 'LOAD_USERS':
            return {
                ...state,
                users: [...action.users],
            };

        case 'SET_LOGGED_IN_USER':
            return {
                ...state,
                loggedInUser: {...action.user},
            };

        default:
            return state;
    }
}
