import { useState } from 'react';
import { useDidUpdate } from './useDidUpdate';

export const useForm = (initialState, cbFunc = () => {}) => {
    const [fields, setFields] = useState(initialState);

    useDidUpdate(() => {
        cbFunc(fields);
    }, [fields]);

    const handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        setFields((prevFields) => ({ ...prevFields, [field]: value }));
    };

    return [fields, handleChange, setFields];
};
