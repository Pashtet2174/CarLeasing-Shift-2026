import Content from './components/Content/Content.jsx';
import './Styles/app.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import CarDetails from './components/Content/carDetails.jsx';
import MainLayout from './components/MainLayout.jsx';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Content />} />
                    <Route path="car/:id" element={<CarDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
