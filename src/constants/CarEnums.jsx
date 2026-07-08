export const BrandTranslations = {
    haval: 'Haval',
    hyundai: 'Hyundai',
    volkswagen: 'Volkswagen',
    kia: 'Kia',
    geely: 'Geely',
    mercedes: 'Mercedes',
    garden_car: 'Садовая тачка',
    grocery_cart: 'Тележка',
    haier: 'Haier',
    invalid: 'Кресло каталка '
};
export const BodyTypeTranslations = {
    sedan: 'Седан',
    suv: 'Внедорожник',
    coupe: 'Купе',
    hatchback: 'Хэтчбек',
    cabriolet: 'Кабриолет'
};

export const ColorTranslations = {
    black: 'Черный',
    white: 'Белый',
    red: 'Красный',
    silver: 'Серебристый',
    blue: 'Синий',
    grey: 'Серый',
    orange: 'Оранжевый'
};

export const SteeringTranslations = {
    left: 'Левый руль',
    right: 'Правый руль'
};

export const TransmissionTranslations = {
    automatic: 'Автомат',
    manual: 'Механика'
};
export const translate = (category, value) => {
    const dictionaries = {
        brand: BrandTranslations,
        bodyType: BodyTypeTranslations,
        color: ColorTranslations,
        transmission: TransmissionTranslations,
        steering: SteeringTranslations
    };

    return dictionaries[category]?.[value] || value;
};