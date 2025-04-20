import { api } from "@/api";

export const getCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};

export const getCategoryBySlug = async (slug: string) => {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data;
};

export const getFeaturedCategories = async () => {
    const response = await api.get("/categories/featured");
    return response.data;
};

export const getPopularCategories = async () => {
    const response = await api.get("/categories/popular");
    return response.data;
};

export const getRecentlyAddedCategories = async () => {
    const response = await api.get("/categories/recently-added");
    return response.data;
};

export const toggleFeaturedCategory = async (id: string) => {
    const response = await api.post(`/categories/toggle-featured/${id}`);
    return response.data;
};

