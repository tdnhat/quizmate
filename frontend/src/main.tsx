import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import { QuizProvider } from "./contexts/QuizContext.tsx";

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
