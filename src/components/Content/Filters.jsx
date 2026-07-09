import CloseIcon from "../../images/closeIcon.svg?react";
import {
    BrandTranslations,
    BodyTypeTranslations,
    ColorTranslations,
    SteeringTranslations,
    TransmissionTranslations
} from './../../constants/CarEnums';
import '../../Styles/Filters.css';
const Filters = ({
    isOpen,
    onClose,
    tempFilters,
    setTempFilters,
    onApply,
    onReset
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };
    const handleValueChange = (key, value) => {
        setTempFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };
    const minLimit = 0;
    const maxLimit = 20000;

    const minPercent = ((Number(tempFilters.minPrice) || minLimit) - minLimit) / (maxLimit - minLimit) * 100;
    const maxPercent = ((Number(tempFilters.maxPrice) || maxLimit) - minLimit) / (maxLimit - minLimit) * 100;
    return (

        <>
            <div className={`filters-overlay ${isOpen ? 'filters-overlay-open' : 'filters-overlay-closed'}`} onClick={onClose}></div>
            <div className={`filters-content ${isOpen ? 'filters-content-open' : 'filters-content-closed'}`}>
                <div className="drawer-header">
                    <h2>Фильтры</h2>
                    <button className="close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="drawer-content">
                    <div className="filter-group">
                        <label>Марка</label>
                        <select
                            name="brand"
                            className={`filter-select ${!tempFilters.brand ? 'filter-select--placeholder' : ''}`}
                            value={tempFilters.brand}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Выберите марку</option>
                            {Object.entries(BrandTranslations).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Тип кузова</label>
                        <select
                            name="bodyType"
                            className={`filter-select ${!tempFilters.bodyType ? 'filter-select--placeholder' : ''}`}
                            value={tempFilters.bodyType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Выберите тип кузова</option>
                            {Object.entries(BodyTypeTranslations).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Руль</label>
                        <div className="btn-group">
                            <button
                                className={tempFilters.steering === 'any' ? 'active' : ''}
                                onClick={() => handleValueChange('steering', 'any')}
                            >
                                Любой
                            </button>

                            {Object.entries(SteeringTranslations).map(([key, value]) => (
                                <button
                                    key={key}
                                    className={tempFilters.steering === key ? 'active' : ''}
                                    onClick={() => handleValueChange('steering', key)}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Коробка передач</label>
                        <div className="btn-group">
                            <button
                                className={tempFilters.transmission === 'any' ? 'active' : ''}
                                onClick={() => handleValueChange('transmission', 'any')}
                            >
                                Любая
                            </button>
                            {Object.entries(TransmissionTranslations).map(([key, value]) => (
                                <button
                                    key={key}
                                    className={tempFilters.transmission === key ? 'active' : ''}
                                    onClick={() => handleValueChange('transmission', key)}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-group">
                        <span className="filter-group-price">Стоимость</span>
                        <div className="price-inputs">
                            <div className="price-field-group">
                                <label htmlFor="min-price">От</label>
                                <input
                                    id="min-price"
                                    name="minPrice"
                                    type="number"
                                    placeholder="0 руб."
                                    className="price-field"
                                    value={tempFilters.minPrice}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="price-field-group">
                                <label htmlFor="max-price">До</label>
                                <input
                                    id="max-price"
                                    name="max-price"
                                    type="number"
                                    placeholder="20 000 руб."
                                className="price-field"
                                value={tempFilters.maxPrice}
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="dual-range-slider">
                            <input
                                type="range"
                                min="0"
                                max="20000"
                                value={tempFilters.minPrice || 0}
                                onChange={(e) => {
                                    const value = Math.min(Number(e.target.value), Number(tempFilters.maxPrice) || 20000);
                                    setTempFilters({ ...tempFilters, minPrice: value.toString() });
                                }}
                                className="range-input"
                                style={{ zIndex: (tempFilters.minPrice > 15000) ? '5' : '3' }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="20000"
                                value={tempFilters.maxPrice || 20000}
                                onChange={(e) => {
                                    const value = Math.max(Number(e.target.value), Number(tempFilters.minPrice) || 0);
                                    setTempFilters({ ...tempFilters, maxPrice: value.toString() });
                                }}
                                className="range-input"
                            />
                            <div className="slider-track"
                                 style={{
                                     '--min-range': `${minPercent}%`,
                                     '--max-range': `${maxPercent}%`
                                 }} />
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Цвет</label>
                        <div className="color-picker-row">
                            {Object.entries(ColorTranslations).map(([key, value]) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={`color-circle color-${key} ${tempFilters.color === key ? 'active' : ''}`}
                                    onClick={() => handleValueChange('color', tempFilters.color === key ? '' : key)}
                                    title={value}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="drawer-footer">
                    <button className="btn-reset" onClick={onReset}>Сбросить фильры</button>
                    <button className="btn-submit" onClick={onApply}>Найти</button>
                </div>
            </div>

        </>
    )
}

export default Filters;