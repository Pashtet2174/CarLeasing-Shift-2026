import { translate} from '../../constants/CarEnums.jsx';
import { BASE_URL } from '../../api/carsApi.jsx';

const CarCard = (props) => {
    const {
        car:{
            id, name, media, transmission, price
        }={}
    } = props;
    const coverImage = media?.[0] ? `${BASE_URL}${media[0].url}` : "";
    const transmissionText = translate('transmission', transmission);
    const rentDays = 14;
    const totalPrice = price * rentDays;
    return (
        <article className="car-card">
            <div className="car-card__image-container">
                <img src={coverImage} className="car-card__image" />
            </div>
            <div className="car-card__content">
                <header className="car-card__header">
                    <h3 className="car-card__title">
                        {name}
                    </h3>
                </header>

                <div className="car-card__description">
                    <p className="car-card__text">
                        {transmissionText}.
                    </p>
                    <h4 className="car-card__price">
                        {price.toLocaleString('ru-RU')} ₽
                    </h4>
                    <p>
                        {totalPrice.toLocaleString('ru-RU')} ₽ за {rentDays} дней
                    </p>
                </div>
                <button
                    onClick={() => console.log(`Авто с id: ${id}`)}
                    className="car-card__button">
                    Подробнее
                </button>
            </div>
        </article>
    );
}

export default CarCard;