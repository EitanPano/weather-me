import { useEffect, useState } from 'react';
import { eventBusService } from '../services/eventBusService';

export const UserMessage = () => {
    const [userMessage, setUserMessage] = useState(null);
    let timeoutId;

    const showMessage = () => {
        timeoutId = setTimeout(() => {
            setUserMessage(null);
        }, 3000);
    };

    useEffect(() => {
        eventBusService.on('showMsg', (ev) => {
            clearTimeout(timeoutId);
            const { type, text, cbFunc } = ev;
            setUserMessage({ type, text, cbFunc });
            showMessage();
        });
        return () => {
            clearTimeout(timeoutId);
            setUserMessage(null);
        };
    }, []);

    if (!userMessage) return null;

    const { type, text, cbFunc } = userMessage;

    const switchMessage = () => {
        if (cbFunc && type) {
            return (
                <p className={`snack-bar ${type}`}>
                    {text} - <span className='bold' onClick={cbFunc}>Here</span>
                </p>
            );
        } else if (cbFunc) {
            return (
                <p className={`snack-bar ${type}`}>
                    {text} - <span className='cursor bold' onClick={cbFunc}>Here</span>
                </p>
            );
        } else if (type) {
            return <p className={`snack-bar ${type}`}>{text}</p>;
        }
        return <p className={'snack-bar'}>{text}</p>;
    };

    return switchMessage();
};
