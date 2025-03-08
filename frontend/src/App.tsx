import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/home/HomePage";
import HomeLayout from "./layouts/HomeLayout";
import DiscoverPage from "./pages/home/DiscoverPage";
import LibraryPage from "./pages/home/LibraryPage";
import ReportsPage from "./pages/home/ReportsPage";
import TeamsPage from "./pages/home/TeamsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<MainLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* <Route element={<ProtectedRoute />}> */}
                    <Route element={<HomeLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/discover" element={<DiscoverPage />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="teams" element={<TeamsPage />} />
                    </Route>
                {/* </Route> */}

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
