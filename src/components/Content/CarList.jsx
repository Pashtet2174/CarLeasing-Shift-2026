    import CarCard from './CarCard.jsx';
    import { useState, useEffect, useRef } from 'react';
    import {getCars} from "../../api/carsApi.jsx";

    const CarList = () => {
        const [cars, setCars] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [isLoading, setIsLoading] = useState(false)
        const [hasMore, setHasMore] = useState(true);

        const observerRef = useRef(null);
        const loaderRef = useRef(null);


        const loadCars = async (pageToLoad) => {
            if ( !hasMore) return;

            setIsLoading(true);
            console.log(`Запрашиваем страницу номер: ${pageToLoad}`);

            try {
                const response = await getCars({ page: pageToLoad });
                const { data, meta } = response;

                setCars((prevCars) => [...prevCars, ...data]);

                if (pageToLoad >= meta.totalPages) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Ошибка при загрузке машин:", error.message);
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
                if (entries[0].isIntersecting && !isLoading ) {
                    setIsLoading(true);
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            };

            observerRef.current = new IntersectionObserver(callback, {
                rootMargin: '100px',
                threshold: 1.0
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
                        <CarCard key={carItem.id} car={carItem} />
                    ))}
                </div>

                {hasMore && (
                    <div ref={loaderRef} style={{ height: '40px', textAlign: 'center', padding: '10px' }}>
                        {isLoading ? <h4>Загрузка...</h4> : <h4>Скролльте для загрузки</h4>}
                    </div>
                )}

            </div>
        );
    }

    export default CarList;