import { api } from ".";

export const getQuizResult = async (resultId: string) => {
    const response = await api.get(`/results/${resultId}`);
    return response.data;
};

