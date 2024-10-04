import { useNavigate } from "react-router-dom";
import { checkLogin, logoutUser } from "@service/index.service";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { UserType } from "@customTypes/userType";

const PlayContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export default function Play() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>({
        userId: "",
        userName: "",
        email: "",
    });

    const getUserInfo = async () => {
        const response = await checkLogin();
        console.log(response);
        setUser(response.user);
    };

    const handleLogout = async () => {
        const response = await logoutUser();
        console.log(response.message);
        navigate("/");
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <PlayContainer>
            <h1>유저 정보 페이지</h1>
            {user && (
                <>
                    <p>{user.userName}님 환영합니다!</p>
                    <p>이메일: {user.email}</p>
                    <p>마지막 접속 기록: {user.userLog[0].address}</p>
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
