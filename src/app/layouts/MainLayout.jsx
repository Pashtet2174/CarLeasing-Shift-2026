import { Outlet } from 'react-router';

import Header from '../../widgets/header';

const MainLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};
export default MainLayout;
