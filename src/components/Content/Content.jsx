import Calendar from "../../images/calendar.svg?react";
import SearchIcon from "../../images/searchIcon.svg?react";
import FilterIcon from "../../images/filterIcon.svg?react";
import '../../Styles/Content.css';
import CarList from "./CarList.jsx";
const Content = () => {
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
                            <input id="model-search" type="search" placeholder="Модель машины"/>
                        </div>
                    </div>
                </div>
                <div className="actions-group">
                    <button className="search-btn">Найти машину</button>
                    <button className="filter-btn">
                        <FilterIcon className="filter-icon" />
                    </button>
                </div>
            </div>
            <CarList />
        </main>
    );
};

export default Content;