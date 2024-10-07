import { useLoaderData, useNavigate } from "react-router-dom";
import { logoutUser } from "@service/index.service";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { LogType } from "@customTypes/userType";
import formatDateString from "@utils/format";
import { LoginLoaderData } from "@customTypes/routerType";
import TextButton from "@components/TextButton";

const PlayContainer = styled("div")`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 30px;
    box-sizing: content-box;
    border-radius: 20px;
    background-color: ${(props) => props.theme.color.base_200};
    box-shadow: 0px 0px 30px 5px ${(props) => props.theme.color.base_content};
    gap: 10px;
`;

const TitleWrapper = styled("div")`
    font-weight: 900;
    font-size: 36px;
`;

const DescWrapper = styled("div")`
    font-weight: 400;
    font-size: 18px;
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
            {user && (
                <>
                    <TitleWrapper>{user.userName} 님 환영합니다!</TitleWrapper>
                    <DescWrapper>이메일: {user.email}</DescWrapper>
                    <DescWrapper>최근 보안 활동:</DescWrapper>
                    {lastLoginLog && lastLoginLog.length > 0 ? (
                        lastLoginLog.slice(0, 3).map((log, index) => (
                            <DescWrapper key={index}>
                                {log.address}에서 새로 로그인 -{" "}
                                {formatDateString(log.date)}
                            </DescWrapper>
                        ))
                    ) : (
                        <p>접속 기록이 없습니다.</p>
                    )}
                    <TextButton
                        width="160px"
                        text="로그아웃"
                        onClick={handleLogout}
                    />
                </>
            )}
        </PlayContainer>
    );
}
