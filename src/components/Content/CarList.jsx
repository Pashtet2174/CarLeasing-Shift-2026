import CarCard from './CarCard.jsx';
import { apiResponse } from '../../ExampleData/CarsData.jsx';

const CarList = () => {
    const { data: cars, meta } = apiResponse;

    const handlePageChange = (pageNumber) => {
        console.log(`Запрашиваем у API страницу номер: ${pageNumber}`);
    };
    const pages = [];
    for (let i = 1; i <= meta.totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="catalog-container">

            <div className="car-grid">
                {cars.map((carItem) => (
                    <CarCard key={carItem.id} car={carItem} />
                ))}
            </div>

            <div className="pagination">
                <button
                    className="pagination__button"
                    disabled={meta.page === 1}
                    onClick={() => handlePageChange(meta.page - 1)}
                >
                    Назад
                </button>
                <button
                    className="pagination__button"
                    disabled={meta.page === meta.totalPages}
                    onClick={() => handlePageChange(meta.page + 1)}
                >
                    Вперед
                </button>
            </div>

        </div>
    );
}

export default CarList;