import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./features/auth/contexts/AuthContext.tsx";
import { CategoriesProvider } from "./features/categories/contexts/CategoriesContext.tsx";
import { QuizzesProvider } from "./features/quizzes/contexts/QuizzesContext.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <CategoriesProvider>
                <QuizzesProvider>
                        <App />
                </QuizzesProvider>
            </CategoriesProvider>
        </AuthProvider>
    </BrowserRouter>
);
