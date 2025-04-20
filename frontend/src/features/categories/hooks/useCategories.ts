import { CategoriesContext } from "@/features/categories/contexts/CategoriesContext";
import { useContext } from "react";

export const useCategories = () => {
    const context = useContext(CategoriesContext);

    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }

    return context;
};
