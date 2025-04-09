import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { JoinQuizPage } from "./pages/home/quizzes/JoinQuizPage";
import { ParticipateQuizPage } from "./pages/home/quizzes/ParticipateQuizPage";
import { AuthenticatedApp } from "./components/auth/AuthenticatedApp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<MainLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route path="/join/:joinCode" element={<JoinQuizPage />} />
                <Route
                    path="quizzes/participate/:sessionId"
                    element={<ParticipateQuizPage />}
                />

                {/* Protected Routes */}
                <Route path="/*" element={<AuthenticatedApp />} />

                <Route path="404" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
