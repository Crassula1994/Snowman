import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "@service/index.service";
import styled from "styled-components";

const PlayContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export default function Play() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};
    const handleLogout = async () => {
        const response = await logoutUser();
        console.log(response.message);
        navigate("/");
    };

    return (
        <PlayContainer>
            <h1>유저 정보 페이지</h1>
            {user && (
                <>
                    <p>{user.username}님 환영합니다!</p>
                    <p>이메일: {user.email}</p>
                    <button
                        className="btn mx-3 btn-primary"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </>
            )}
        </PlayContainer>
    );
}
