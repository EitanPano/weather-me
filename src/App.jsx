import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/style.scss';
import { Home } from './views/Home';
import { Favorite} from './views/Favorite'
import { AppHeader } from './cmps/AppHeader';

export function App() {
    return (
        <Router>
            <div className="App">
				<AppHeader></AppHeader>
                <Routes>
                    <Route element={<Favorite />} path="/favorite"></Route>
                    <Route element={<Home />} path="/"></Route>
					<Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </div>
            ;
        </Router>
    );
}

