import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import styled, { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";

const AppContainer = styled("div")`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppContainer>
                <Outlet />
            </AppContainer>
        </ThemeProvider>
    );
}
