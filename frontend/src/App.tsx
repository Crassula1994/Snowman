import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "@routes/index.route";
import GlobalStyle from "@styles/globalStyles";

export default function App() {
    return (
        <>
            <GlobalStyle />
            <div className="container">
                <AppRoutes />
            </div>
        </>
    );
}
