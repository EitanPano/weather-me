export function BurgerMenu({isMenuOpen, onToggle}) {

    return (
        <>
            <input onChange={onToggle} type="checkbox" id="burger-toggle" checked={isMenuOpen} />
            <label htmlFor="burger-toggle" className="icon">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </>
    );
}
