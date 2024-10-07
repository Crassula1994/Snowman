import { createBrowserRouter } from "react-router-dom";
import Login from "@pages/login";
import Play from "@pages/play";
import Register from "@pages/register";
import App from "src/App";
import { checkLogin } from "@service/index.service";

const loginLoader = async () => {
    const response = await checkLogin();
    return response;
};

const router = createBrowserRouter([
    {
        path: "/",
        loader: loginLoader,
        element: <App />,
        children: [
            {
                path: "login",
                loader: loginLoader,
                element: <Login />,
            },
            {
                path: "register",
                loader: loginLoader,
                element: <Register />,
            },
            {
                path: "play",
                loader: loginLoader,
                element: <Play />,
            },
        ],
    },
]);

export default router;
