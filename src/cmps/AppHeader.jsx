import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleMetric } from '../store/actions/locationActions';

import { BurgerMenu } from './BurgerMenu';

export function AppHeader() {
    const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {isMetric} = useSelector((state) => state.locationModule);

    const onToggle = ({target}) => {
        setIsMenuOpen(target.checked)
    }



    
    return (
        <header className="app-header">
            <h1><NavLink to="/">WeatherMe</NavLink></h1>
            <button onClick={() => dispatch(toggleMetric())}>{isMetric ? 'Cel' : 'Fahr'}</button>
            <BurgerMenu isMenuOpen={isMenuOpen} onToggle={onToggle}></BurgerMenu>
            <nav onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorite">Favorites</NavLink>
            </nav>
        </header>
    );
}