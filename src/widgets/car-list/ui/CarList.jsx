import { useEffect, useRef, useState } from 'react';

import CarCard, { getCars } from '../../../entities/car';

const CarList = ({ appliedFilters, rentDays, startDate, endDate }) => {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef(null);
    const loaderRef = useRef(null);

    const loadCars = async (pageToLoad) => {
        if (!hasMore) return;
        setIsLoading(true);

        try {
            const Params = { page: pageToLoad };
            for (const key in appliedFilters) {
                const value = appliedFilters[key];

                if (value !== '' && value !== 'any') {
                    Params[key] = value;
                }
            }

            const response = await getCars(Params);
            const { data, meta } = response;

            setCars((currentCars) => [...currentCars, ...data]);

            if (pageToLoad >= meta.totalPages) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Ошибка при загрузке машин:', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        void loadCars(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (!hasMore || isLoading) return;
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const callback = (entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                setIsLoading(true);
                setCurrentPage((prevPage) => prevPage + 1);
            }
        };

        observerRef.current = new IntersectionObserver(callback, {
            rootMargin: '100px',
            threshold: 1.0,
        });

        if (loaderRef.current) {
            observerRef.current.observe(loaderRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoading]);

    return (
        <div className="catalog-container">
            <div className="car-grid">
                {cars.map((carItem) => (
                    <CarCard
                        key={carItem.id}
                        car={carItem}
                        rentDays={rentDays}
                        startDate={startDate}
                        endDate={endDate}
                    />
                ))}
            </div>

            {hasMore && (
                <div
                    ref={loaderRef}
                    style={{
                        height: '40px',
                        textAlign: 'center',
                        padding: '10px',
                    }}
                >
                    {isLoading ? <h4>Загрузка...</h4> : <></>}
                </div>
            )}
        </div>
    );
};

export default CarList;
