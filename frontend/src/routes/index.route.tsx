import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";
import Play from "@pages/play";
import Register from "@pages/register";

// Component for defining application routes
export default function AppRoutes() {
    const user = false;

    return (
        // Wrap routes with BrowserRouter to enable routing
        <BrowserRouter>
            {/* Define application routes */}
            <Routes>
                {/* Route for homepage, redirects to homepage if user is authenticated, otherwise redirects to login */}
                <Route path="/" element={<Home />} />
                {/* Route for registration page, redirects to homepage if user is authenticated, otherwise renders registration page */}
                {user ? (
                    <Route path="/register" element={<Navigate to="/" />} />
                ) : (
                    <Route path="/register" element={<Register />} />
                )}
                {/* Route for login page, redirects to homepage if user is authenticated, otherwise renders login page */}
                {user ? (
                    <Route path="/login" element={<Navigate to="/" />} />
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
                {user ? (
                    <Route path="/play" element={<Play />} />
                ) : (
                    // <Route path="/play" element={<Navigate to="/login" />} />
                    <Route path="/play" element={<Play />} />
                )}
                {/* Route for 404 not found page, renders 404 not found page if no route matche*/}
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
