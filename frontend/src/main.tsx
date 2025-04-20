import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./features/auth/contexts/AuthContext.tsx";
import { CategoriesProvider } from "./features/categories/contexts/CategoriesContext.tsx";
import { QuizzesProvider } from "./features/quizzes/contexts/QuizzesContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <CategoriesProvider>
                    <QuizzesProvider>
                        <App />
                    </QuizzesProvider>
                </CategoriesProvider>
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>
);
