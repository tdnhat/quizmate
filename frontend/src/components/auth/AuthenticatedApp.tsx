import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/home/HomePage";
import LibraryPage from "@/pages/home/LibraryPage";
import QuizzesPage from "@/pages/home/quizzes/QuizzesPage";
import CreateQuizPage from "@/pages/home/quizzes/CreateQuizPage";
import CategoryDetailPage from "@/pages/home/categories/CategoryDetailPage";
import QuizDetailPage from "@/pages/home/quizzes/QuizDetailPage";
import TakeQuizPage from "@/pages/home/quizzes/TakeQuizPage";
import HostQuizPage from "@/pages/home/quizzes/HostQuizPage";
import QuizResultsPage from "@/pages/home/quizzes/QuizResultsPage";
import AllCategoriesPage from "@/pages/home/categories/AllCategoriesPage";
import AllQuizzesPage from "@/pages/home/quizzes/AllQuizzesPage";
import CategoriesPage from "@/pages/home/categories/CategoriesPage";
import SettingsPage from "@/pages/home/SettingsPage";
export const AuthenticatedApp = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <DotLoader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
        );
    }

    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/quizzes/all" element={<AllQuizzesPage />} />
                <Route path="/quizzes/create" element={<CreateQuizPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/all" element={<AllCategoriesPage />} />
                <Route
                    path="/categories/:slug"
                    element={<CategoryDetailPage />}
                />
                <Route path="quizzes/:quizSlug" element={<QuizDetailPage />} />
                <Route
                    path="quizzes/:quizSlug/take"
                    element={<TakeQuizPage />}
                />
                <Route
                    path="quizzes/:quizSlug/host"
                    element={<HostQuizPage />}
                />
                <Route
                    path="quizzes/:quizSlug/results/:resultId"
                    element={<QuizResultsPage />}
                />
            </Route>
        </Routes>
    );
};
