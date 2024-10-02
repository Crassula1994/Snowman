import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const HomeContainer = styled("div")`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const ButtonContainer = styled("div")`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const TitleWrapper = styled("div")`
    font-weight: 900;
    font-size: 50px;
`;

const DescWrapper = styled("div")`
    font-weight: 500;
    font-size: 30px;
`;

export default function Homepage() {
    return (
        <HomeContainer>
            <TitleWrapper>홈페이지</TitleWrapper>
            <DescWrapper>환영합니다!</DescWrapper>
            <ButtonContainer>
                <NavLink to="/register">
                    <button className="btn mx-3 btn-primary">회원가입</button>
                </NavLink>
                <NavLink to="/login">
                    <button className="btn btn-primary">로그인</button>
                </NavLink>
            </ButtonContainer>
        </HomeContainer>
    );
}
