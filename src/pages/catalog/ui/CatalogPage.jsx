import { useState } from 'react';

import { differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';

import Filters from '../../../features/cars-filters';
import Calendar from '../../../shared/assets/icons/CalendarIcon.svg?react';
import FilterIcon from '../../../shared/assets/icons/FilterIcon.svg?react';
import SearchIcon from '../../../shared/assets/icons/SearchIcon.svg?react';
import CarList from '../../../widgets/car-list';
import './CatalogPage.css';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

const CatalogPage = () => {
    const initialFilters = {
        brand: '',
        bodyType: '',
        color: '',
        steering: 'any',
        transmission: 'any',
        minPrice: '',
        maxPrice: '',
        search: '',
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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const rentDays = Math.max(1, differenceInDays(endDate, startDate));
    return (
        <main className="content">
            <div className="searching-container">
                <div className="inputs-group">
                    <div className="input-field date-field">
                        <label htmlFor="start-date">Начало аренды</label>
                        <div className="text-field">
                            <Calendar className="field-icon" />
                            <DatePicker
                                id="start-date"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
                                locale="ru"
                                dateFormat="dd MMMM yyyy"
                            />
                        </div>
                    </div>
                    <div className="input-field date-field">
                        <label htmlFor="end-date">Окончание аренды</label>
                        <div className="text-field">
                            <Calendar className="field-icon" />
                            <DatePicker
                                id="end-date"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                locale="ru"
                                dateFormat="dd MMMM yyyy"
                            />
                        </div>
                    </div>
                    <div className="input-field search-field">
                        <label htmlFor="model-search">Поиск</label>
                        <div className="text-field">
                            <SearchIcon className="field-icon" />
                            <input
                                id="model-search"
                                name="search"
                                type="search"
                                placeholder="Модель машины"
                                value={tempFilters.search}
                                onChange={(e) => {
                                    setTempFilters({
                                        ...tempFilters,
                                        search: e.target.value,
                                    });
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
                    <button className="search-btn" onClick={handleApplyFilters}>
                        Найти машину
                    </button>
                    <button
                        className="filter-btn"
                        onClick={() => setIsFiltersOpen(true)}
                    >
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
            <CarList
                appliedFilters={appliedFilters}
                key={JSON.stringify(appliedFilters)}
                rentDays={rentDays}
                startDate={startDate}
                endDate={endDate}
            />
        </main>
    );
};

export default CatalogPage;
