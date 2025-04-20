import { useContext } from "react";
import { CategoryDetailContext } from "../contexts/CategoryDetailContext";

export const useCategoryDetail = () => {
    const context = useContext(CategoryDetailContext);
    if (!context)
        throw new Error(
            "useCategoryDetail must be used within a CategoryDetailProvider"
        );
    return context;
};
