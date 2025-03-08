import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./features/auth/contexts/AuthContext.tsx";
import { CategoryProvider } from "./features/categories/contexts/CategoryContext.tsx";
import { QuizProvider } from "./features/quizzes/contexts/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <CategoryProvider>
                <QuizProvider>
                    <App />
                </QuizProvider>
            </CategoryProvider>
        </AuthProvider>
    </BrowserRouter>
);
