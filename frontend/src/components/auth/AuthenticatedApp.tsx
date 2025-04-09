import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import DotLoader from "@/components/shared/components/loaders/DotLoader";
import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/home/HomePage";
import LibraryPage from "@/pages/home/LibraryPage";
import ReportsPage from "@/pages/home/ReportsPage";
import TeamsPage from "@/pages/home/TeamsPage";
import QuizPage from "@/pages/home/quizzes/QuizPage";
import PopularQuizzesPage from "@/pages/home/quizzes/PopularQuizzesPage";
import RecentlyAddedQuizzesPage from "@/pages/home/quizzes/RecentlyAddedQuizzesPage";
import CreateQuizPage from "@/pages/home/quizzes/CreateQuizPage";
import CategoryPage from "@/pages/home/categories/CategoryPage";
import FeaturedCategoriesPage from "@/pages/home/categories/FeaturedCategoriesPage";
import PopularCategoriesPage from "@/pages/home/categories/PopularCategoriesPage";
import RecentCategoriesPage from "@/pages/home/categories/RecentCategoriesPage";
import CategoryDetailPage from "@/pages/home/categories/CategoryDetailPage";
import QuizDetailPage from "@/pages/home/quizzes/QuizDetailPage";
import TakeQuizPage from "@/pages/home/quizzes/TakeQuizPage";
import HostQuizPage from "@/pages/home/quizzes/HostQuizPage";
import QuizResultsPage from "@/pages/home/quizzes/QuizResultsPage";

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
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="teams" element={<TeamsPage />} />
                <Route path="/quizzes" element={<QuizPage />} />
                <Route path="/quizzes/popular" element={<PopularQuizzesPage />} />
                <Route path="/quizzes/recently-added" element={<RecentlyAddedQuizzesPage />} />
                <Route path="/quizzes/create" element={<CreateQuizPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/categories/featured" element={<FeaturedCategoriesPage />} />
                <Route path="/categories/popular" element={<PopularCategoriesPage />} />
                <Route path="/categories/recently-added" element={<RecentCategoriesPage />} />
                <Route path="/categories/:slug" element={<CategoryDetailPage />} />
                <Route path="quizzes/:quizSlug" element={<QuizDetailPage />} />
                <Route path="quizzes/:quizSlug/take" element={<TakeQuizPage />} />
                <Route path="quizzes/:quizSlug/host" element={<HostQuizPage />} />
                <Route path="quizzes/:quizSlug/results/:resultId" element={<QuizResultsPage />} />
            </Route>
        </Routes>
    );
}; 