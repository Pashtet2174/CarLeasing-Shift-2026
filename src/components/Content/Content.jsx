import Calendar from "../../images/calendar.svg?react";
import SearchIcon from "../../images/searchIcon.svg?react";
import FilterIcon from "../../images/filterIcon.svg?react";
import '../../Styles/Content.css';
import CarList from "./CarList.jsx";
import Filters from "./Filters.jsx";
import {useState} from "react";
const Content = () => {
    const initialFilters = {
        brand: '',
        bodyType: '',
        color: '',
        steering: 'any',
        transmission: 'any',
        minPrice: '',
        maxPrice: '',
        search: ''
    };

    const [tempFilters, setTempFilters] = useState(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleApplyFilters = () => {
        setAppliedFilters(tempFilters);
        setIsFiltersOpen(false);
    };

    const handleResetFilters = () => {
        setTempFilters(initialFilters);
        setAppliedFilters(initialFilters);
    };
    return (
        <main className="content">
            <div className="searching-container">
                <div className="inputs-group">
                    <div className="input-field date-field">
                        <label htmlFor="start-date">Начало аренды</label>
                        <div className="text-field">
                            <Calendar className="field-icon" />
                            <input id="start-date" type="text" placeholder="10 апреля 2025"/>
                        </div>
                    </div>
                    <div className="input-field date-field">
                        <label htmlFor="end-date">Окончание аренды</label>
                        <div className="text-field">
                            <Calendar className="field-icon" />
                            <input id="end-date" type="text" placeholder="24 апреля 2025"/>
                        </div>
                    </div>
                    <div className="input-field search-field">
                        <label htmlFor="model-search">Поиск</label>
                        <div className="text-field">
                            <SearchIcon className="field-icon" />
                            <input id="model-search" name="search" type="search" placeholder="Модель машины" value={tempFilters.search}
                                   onChange={(e) => {
                                       setTempFilters({ ...tempFilters, search: e.target.value });
                                   }}
                                   onKeyDown={(e) => {
                                       if (e.key === 'Enter') {
                                           handleApplyFilters();
                                       }
                                   }}
                            />
                        </div>
                    </div>
                </div>
                <div className="actions-group">
                    <button className="search-btn" onClick={handleApplyFilters}>Найти машину</button>
                    <button className="filter-btn" onClick={() => setIsFiltersOpen(true)}>
                        <FilterIcon className="filter-icon" />
                    </button>
                </div>
            </div>
            <Filters
                isOpen={isFiltersOpen}
                onClose={() => setIsFiltersOpen(false)}
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
            <CarList appliedFilters={appliedFilters} key={JSON.stringify(appliedFilters)} />
        </main>
    );
};

export default Content;