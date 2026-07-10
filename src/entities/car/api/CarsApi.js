export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCars = async (params = {}) => {
    try {
        const searchParams = new URLSearchParams();

        for (const key in params) {
            const value = params[key];

            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    for (const val of value) {
                        searchParams.append(key, val);
                    }
                } else {
                    searchParams.append(key, value);
                }
            }
        }

        const response = await fetch(`${BASE_URL}/cars/info?${searchParams}`);

        if (!response.ok) {
            throw new Error(`Ошибка при получении данных о машинах`);
        }
        const result = await response.json();
        if (!result.success) {
            throw new Error(
                result.reason || 'Не удалось загрузить данные о машинах'
            );
        }
        return result;
    } catch (error) {
        console.error('Ошибка в fetchCars:', error.message);
        throw error;
    }
};
export const getCarById = async (carId) => {
    try {
        const response = await fetch(`${BASE_URL}/cars/info/${carId}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных о машине');
        }
        const result = await response.json();
        if (!result.success) {
            throw new Error(
                result.reason || `Автомобиль с ID ${carId} не найден`
            );
        }
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
