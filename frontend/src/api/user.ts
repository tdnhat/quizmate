import { api } from "./index";

export const getUsers = async () => {
    return api.get("/auth/me");
};