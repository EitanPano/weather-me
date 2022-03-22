import { useEffect, useRef } from 'react';

export const useDidUpdate = (cbFunc, dependencies) => {
    const isMounted = useRef(false);
    console.log('useUpdate -> isMounted', isMounted);
    useEffect(() => {

        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        cbFunc();
        
        // (isMounted.current) ? cbFunc() : isMounted.current = true
    }, dependencies);
};
