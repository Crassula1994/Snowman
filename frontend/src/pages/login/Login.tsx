import { Form } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { loginUser } from "@service/index.service";
import { UserType } from "@customTypes/userType";
import { LoginLoaderData } from "@customTypes/routerType";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import TextButton from "@components/TextButton";

const LoginContainer = styled("div")`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 40px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: ${(props) => props.theme.color.base_200};
    box-shadow: 0px 0px 30px 5px ${(props) => props.theme.color.base_content};
`;

const LoginWrapper = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const TitleWrapper = styled("div")`
    font-weight: 900;
    font-size: 36px;
`;

const DescWrapper = styled("div")`
    font-weight: 400;
    font-size: 18px;
`;

const ButtonWrapper = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export default function Login() {
    const { authenticated } = useLoaderData() as LoginLoaderData;
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/register");
    };

    useEffect(() => {
        if (authenticated) {
            navigate("/play");
        }
    }, []);

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        userId: Yup.string().required("아이디를 입력해야 합니다."),
        password: Yup.string().required("비밀번호를 입력해야 합니다."),
    });

    // Define form submit handler
    const handleSubmit = async (
        values: Partial<UserType>,
        { setSubmitting }: FormikHelpers<Partial<UserType>>
    ) => {
        // Handle form submission
        const submit = await loginUser(values);
        console.log(values);
        console.log(submit.message);
        console.log(submit);
        setSubmitting(false);
        if (submit.user) {
            navigate("/play", { state: { user: submit.user } });
        }
    };

    return (
        <LoginContainer>
            <LoginWrapper>
                <TitleWrapper>로그인</TitleWrapper>
                <DescWrapper>Sign-In</DescWrapper>
            </LoginWrapper>
            <hr />
            <LoginWrapper>
                <Formik
                    initialValues={{ userId: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {/* Render form inside Formik */}
                    {({ handleSubmit }: FormikProps<Partial<UserType>>) => (
                        <Form onSubmit={handleSubmit}>
                            {/* User ID input field */}
                            <Form.Group className="mb-3" controlId="user-id">
                                <Form.Label>아이디</Form.Label>
                                <Field
                                    type="userId"
                                    name="userId"
                                    as={Form.Control}
                                />
                            </Form.Group>
                            {/* Password input field */}
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>비밀번호</Form.Label>
                                <Field
                                    type="password"
                                    name="password"
                                    as={Form.Control}
                                />
                            </Form.Group>
                            <ButtonWrapper>
                                <TextButton
                                    width="160px"
                                    type="submit"
                                    text={"로그인"}
                                />
                                <div>또는</div>
                                <TextButton
                                    width="160px"
                                    onClick={handleSignUp}
                                    text={"회원가입"}
                                />
                            </ButtonWrapper>
                            <hr />
                        </Form>
                    )}
                </Formik>
            </LoginWrapper>
            <div>혹시 비밀번호를 잊으셨나요?</div>
        </LoginContainer>
    );
}
