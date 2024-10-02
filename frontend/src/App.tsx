import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "@routes/index.route";
import GlobalStyle from "@styles/globalStyles";
import styled from "styled-components";

const AppContainer = styled("div")`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function App() {
    return (
        <AppContainer>
            <GlobalStyle />
            <AppRoutes />
        </AppContainer>
    );
}
