import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const UserMessage = () => {
    const dispatch = useDispatch();
    const { userMessage } = useSelector((state) => state.userModule);

    let timeoutId;

    useEffect(() => {
        if (!userMessage || !userMessage.text) return;
        if (timeoutId) {
            clearTimeout(timeoutId);
            dispatch({ type: 'SET_USER_MESSAGE' });
        }
        console.log(userMessage);
        timeoutId = setTimeout(() => {
            dispatch({ type: 'SET_USER_MESSAGE' });
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [userMessage]);

    if (!userMessage || !userMessage.text) return null;

    const { type, text, cbFunc } = userMessage;

    const switchMessage = () => {
        if (cbFunc && type) {
            return (
                <p className={`snack-bar ${type}`}>
                    {text} -{' '}
                    <span className="bold" onClick={cbFunc}>
                        Here
                    </span>
                </p>
            );
        } else if (cbFunc) {
            return (
                <p className={`snack-bar ${type}`}>
                    {text} -{' '}
                    <span className="cursor bold" onClick={cbFunc}>
                        Here
                    </span>
                </p>
            );
        } else if (type) {
            return (
                <p className={`snack-bar ${type}`}>
                    {text}
                </p>
            );
        }
        return (
            <p className={'snack-bar'}>
                {text}
            </p>
        );
    };

    return switchMessage();
};
