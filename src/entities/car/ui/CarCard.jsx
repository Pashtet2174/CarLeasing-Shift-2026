import { useNavigate } from 'react-router';

import { format } from 'date-fns';

import { BASE_URL } from '../api/CarsApi';
import { TransmissionTranslations } from '../model/CarTranlations';
import './СarCard.css';

const CarCard = ({ car, rentDays, startDate, endDate }) => {
    const { id, name, media, transmission, price } = car;
    const navigate = useNavigate();
    const coverImage = `${BASE_URL}${media[0].url}`;
    const transmissionText = TransmissionTranslations[transmission];
    const totalPrice = price * rentDays;
    const startStr = format(startDate, 'yyyy-MM-dd');
    const endStr = format(endDate, 'yyyy-MM-dd');
    return (
        <article className="car-card">
            <div className="car-card__image-container">
                <img src={coverImage} className="car-card__image" />
            </div>
            <div className="car-card__content">
                <header className="car-card__header">
                    <h3 className="car-card__title">{name}</h3>
                </header>

                <div className="car-card__description">
                    <p className="car-card__text">{transmissionText}</p>
                    <h4 className="car-card__price">
                        {price.toLocaleString('ru-RU')} ₽
                    </h4>
                    <p>
                        {totalPrice.toLocaleString('ru-RU')} ₽ за {rentDays}{' '}
                        дней
                    </p>
                </div>
                <button
                    onClick={() =>
                        navigate(
                            `/car/${id}?days=${rentDays}&start=${startStr}&end=${endStr}`
                        )
                    }
                    className="car-card__button"
                >
                    Подробнее
                </button>
            </div>
        </article>
    );
};

export default CarCard;
