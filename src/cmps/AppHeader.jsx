import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { BurgerMenu } from './BurgerMenu';

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const onToggle = ({target}) => {
        setIsMenuOpen(target.checked)
    }
    
    return (
        <header className="app-header">
            <h1><NavLink to="/">WeatherMe</NavLink></h1>
            {/* <NavLink className="btn-auth" to="/auth">Sign-in</NavLink> */}
            <BurgerMenu isMenuOpen={isMenuOpen} onToggle={onToggle}></BurgerMenu>
            <nav onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorite">Favorites</NavLink>
            </nav>
        </header>
    );
}