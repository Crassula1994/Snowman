import { useLoaderData, useNavigate } from "react-router-dom";
import { logoutUser } from "@service/index.service";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { LogType } from "@customTypes/userType";
import formatDateString from "@utils/format";
import { LoginLoaderData } from "@customTypes/routerType";

const PlayContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export default function Play() {
    const { authenticated, user } = useLoaderData() as LoginLoaderData;
    const navigate = useNavigate();
    const [lastLoginLog, setLastLoginLog] = useState<LogType[] | undefined>([
        {
            type: "",
            date: "",
            address: "",
        },
    ]);

    const handleLogout = async () => {
        const response = await logoutUser();
        console.log(response.message);
        navigate("/login");
    };

    const getLastLoginLog = () => {
        if (!user || !user.signInLog) return [];

        return user.signInLog
            .slice()
            .reverse()
            .filter((log) => log.type === "Login Success");
    };

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setLastLoginLog(getLastLoginLog());
        console.log(lastLoginLog);
    }, [user]);

    return (
        <PlayContainer>
            <h1>유저 정보 페이지</h1>
            {user && (
                <>
                    <p>{user.userName}님 환영합니다!</p>
                    <p>이메일: {user.email}</p>
                    <p>최근 보안 활동:</p>
                    {lastLoginLog && lastLoginLog.length > 0 ? (
                        lastLoginLog.slice(0, 3).map((log, index) => (
                            <p key={index}>
                                {log.address}에서 새로 로그인 -{" "}
                                {formatDateString(log.date)}
                            </p>
                        ))
                    ) : (
                        <p>접속 기록이 없습니다.</p>
                    )}
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
