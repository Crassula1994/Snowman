import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "@routes/index.route";
import GlobalStyle from "@styles/globalStyles";

const App = () => {
    return (
        <>
            <GlobalStyle />
            <div className="container">
                <AppRoutes />
            </div>
        </>
    );
};

export default App;
