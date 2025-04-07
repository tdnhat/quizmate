import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import HomeLayout from "./layouts/HomeLayout";
import LibraryPage from "./pages/home/LibraryPage";
import ReportsPage from "./pages/home/ReportsPage";
import TeamsPage from "./pages/home/TeamsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateQuizPage from "./pages/home/quizzes/CreateQuizPage";
import QuizDetailPage from "./pages/home/quizzes/QuizDetailPage";
import TakeQuizPage from "./pages/home/quizzes/TakeQuizPage";
import QuizResultsPage from "./pages/home/quizzes/QuizResultsPage";
import CategoryPage from "./pages/home/categories/CategoryPage";
import FeaturedCategoriesPage from "./pages/home/categories/FeaturedCategoriesPage";
import PopularCategoriesPage from "./pages/home/categories/PopularCategoriesPage";
import RecentCategoriesPage from "./pages/home/categories/RecentCategoriesPage";
import CategoryDetailPage from "./pages/home/categories/CategoryDetailPage";
import QuizPage from "./pages/home/quizzes/QuizPage";
import PopularQuizzesPage from "./pages/home/quizzes/PopularQuizzesPage";
import RecentlyAddedQuizzesPage from "./pages/home/quizzes/RecentlyAddedQuizzesPage";
import HostQuizPage from "./pages/home/quizzes/HostQuizPage";
import { JoinQuizPage } from "./pages/home/quizzes/JoinQuizPage";
import { ParticipateQuizPage } from "./pages/home/quizzes/ParticipateQuizPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<MainLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/join/:joinCode" element={<JoinQuizPage />} />

                <Route
                    path="quizzes/participate/:sessionId"
                    element={<ParticipateQuizPage />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route element={<HomeLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="teams" element={<TeamsPage />} />

                        <Route path="/quizzes" element={<QuizPage />} />

                        <Route
                            path="/quizzes/popular"
                            element={<PopularQuizzesPage />}
                        />
                        <Route
                            path="/quizzes/recently-added"
                            element={<RecentlyAddedQuizzesPage />}
                        />

                        <Route
                            path="/quizzes/create"
                            element={<CreateQuizPage />}
                        />

                        <Route path="/categories" element={<CategoryPage />} />
                        <Route
                            path="/categories/featured"
                            element={<FeaturedCategoriesPage />}
                        />
                        <Route
                            path="/categories/popular"
                            element={<PopularCategoriesPage />}
                        />
                        <Route
                            path="/categories/recently-added"
                            element={<RecentCategoriesPage />}
                        />
                        <Route
                            path="/categories/:slug"
                            element={<CategoryDetailPage />}
                        />

                        <Route
                            path="quizzes/:quizSlug"
                            element={<QuizDetailPage />}
                        />

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
                </Route>

                <Route path="404" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
