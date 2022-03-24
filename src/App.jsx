import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/style.scss';

import { Home } from './views/Home';
import { Favorites } from './views/Favorites'
import { AppHeader } from './cmps/AppHeader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from './store/actions/locationActions';


export function App() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setLocation());
    }, []);

    return (
        <Router>
            <div className="App">
				<AppHeader></AppHeader>
                <Routes>
                    <Route element={<Favorites />} path="/favorite"></Route>
                    <Route element={<Home />} path="/"></Route>
					<Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </div>
        </Router>
    );
}

