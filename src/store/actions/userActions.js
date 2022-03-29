import { userService } from '../../services/userService.js';

export function loadUsers() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().userModule;
        try {
            const users = await userService.query(filterBy);
            dispatch({ type: 'LOAD_USERS', users });
        } catch (err) {
            console.log(err);
        }
    };
}

export function setUserMessage(userMessage) {
    return async (dispatch) => {
        dispatch({ type: 'SET_USER_MESSAGE', userMessage });
    };
}
