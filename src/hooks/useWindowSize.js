import { useEffect, useState } from 'react';
import { useDidUpdate } from './useDidUpdate';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        windowWidth: undefined,
        windowHeight: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
};
