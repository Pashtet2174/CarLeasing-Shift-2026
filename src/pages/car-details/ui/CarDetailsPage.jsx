import { useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router';

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

import {
    BodyTypeTranslations,
    BrandTranslations,
    ColorTranslations,
    SteeringTranslations,
    TransmissionTranslations,
} from '../../../entities/car';
import { BASE_URL, getCarById } from '../../../entities/car';
import './CarDetailsPage.css';

const CarDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const rentDays = searchParams.get('days');
    const startParam = searchParams.get('start');
    const endParam = searchParams.get('end');
    const startStr = format(parseISO(startParam), 'dd MMMM', { locale: ru });
    const endStr = format(parseISO(endParam), 'dd MMMM yyyy', { locale: ru });
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    useEffect(() => {
        const fetchCar = async () => {
            setIsLoading(true);
            const result = await getCarById(id);
            const carData = result.data || result;
            setCar(carData);
            setIsLoading(false);
        };
        void fetchCar();
    }, [id]);
    if (isLoading || !car) {
        return <div className="loading-state">Загрузка ...</div>;
    }

    const totalPrice = car.price * rentDays;
    const media = car.media;
    const mainImage = `${BASE_URL}${media[currentImgIndex].url}`;
    const hasMultipleImages = media.length > 1;
    const handlePrev = () => {
        setCurrentImgIndex((prev) =>
            prev === 0 ? media.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentImgIndex((prev) =>
            prev === media.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <main className="car-details-page">
            <div className="details-left-col">
                <button className="back-btn" onClick={() => navigate(`/`)}>
                    <span className="back-icon">❮</span> Назад
                </button>

                <div className="specs-section">
                    <h2 className="section-title">Характеристики</h2>
                    <div className="specs-list">
                        <div className="spec-row">
                            <span className="spec-label">Марка</span>
                            <span className="spec-value">
                                {BrandTranslations[car.brand]}
                            </span>
                        </div>

                        <div className="spec-row">
                            <span className="spec-label">Коробка передач</span>
                            <span className="spec-value">
                                {TransmissionTranslations[car.transmission]}
                            </span>
                        </div>

                        <div className="spec-row">
                            <span className="spec-label">Место нахождение</span>
                            <span className="spec-value">{car.location}</span>
                        </div>

                        <div className="spec-row">
                            <span className="spec-label">Сторона руля</span>
                            <span className="spec-value">
                                {SteeringTranslations[car.steering]} руль
                            </span>
                        </div>

                        <div className="spec-row">
                            <span className="spec-label">Тип кузова</span>
                            <span className="spec-value">
                                {BodyTypeTranslations[car.bodyType]}
                            </span>
                        </div>

                        <div className="spec-row border-none">
                            <span className="spec-label">Цвет</span>
                            <span className="spec-value">
                                {ColorTranslations[car.color]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="price-section">
                    <h2 className="section-title">Стоимость</h2>
                    <div className="price-info">
                        <p className="rent-duration">
                            Аренда на {rentDays} дней
                        </p>
                        <p className="rent-dates">
                            {startStr} — {endStr}
                        </p>
                    </div>
                    <h3 className="total-price">
                        Итого: {totalPrice.toLocaleString('ru-RU')} ₽
                    </h3>
                    <button className="book-btn">Забронировать</button>
                </div>
            </div>

            <div className="details-right-col">
                <h1 className="car-title">{car.name}</h1>

                <div className="main-image-container">
                    {hasMultipleImages && (
                        <button
                            className="slider-btn left"
                            onClick={handlePrev}
                        >
                            ❮
                        </button>
                    )}

                    {mainImage && (
                        <img
                            src={mainImage}
                            alt={car.name}
                            className="main-image"
                        />
                    )}

                    {hasMultipleImages && (
                        <button
                            className="slider-btn right"
                            onClick={handleNext}
                        >
                            ❯
                        </button>
                    )}
                </div>

                {media.length > 0 && (
                    <div className="preview-container">
                        {media.map((img, index) => (
                            <div
                                key={index}
                                className={`preview-image ${index === currentImgIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImgIndex(index)}
                            >
                                <img
                                    src={`${BASE_URL}${img.url}`}
                                    alt={`preview-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default CarDetailsPage;
