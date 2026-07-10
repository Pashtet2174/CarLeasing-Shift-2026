import { BrowserRouter, Route, Routes } from 'react-router';

import CarDetailsPage from '../../pages/car-details';
import CatalogPage from '../../pages/catalog';

import MainLayout from '../layouts';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<CatalogPage />} />
                    <Route path="car/:id" element={<CarDetailsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
