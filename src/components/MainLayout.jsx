import Header from './Header.jsx';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};
export default MainLayout;
