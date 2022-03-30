const INITIAL_STATE = {
    users: [],
    loggedInUser: {
        name: 'Muki',
        coins: 100,
        moves: [],
        isAdmin: true,
    },
    userMessage: null
};

export function userReducer(state = INITIAL_STATE, action) {
    console.log('aciton', action);
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

            case 'SET_USER_MESSAGE':
                return {
                    ...state,
                    userMessage: {...action.userMessage},
                };

        default:
            return state;
    }
}
