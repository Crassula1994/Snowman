import { Form } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, Container } from "./loginStyles";
import { loginUser } from "@service/index.service";
import { UserType } from "@customTypes/userType";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TitleWrapper = styled("div")`
    font-weight: 900;
    font-size: 50px;
`;

const DescWrapper = styled("div")`
    font-weight: 400;
    font-size: 20px;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

export default function Login() {
    const navigate = useNavigate();

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("유효하지 않은 이메일 주소입니다.")
            .required("이메일을 입력해야 합니다."),
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
        <Container className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <TitleWrapper>로그인</TitleWrapper>
                <DescWrapper>
                    회원가입 시 입력한 이메일과 비밀번호로 로그인하세요.
                </DescWrapper>
            </div>
            <hr />
            {/* Formik form wrapper */}
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {/* Render form inside Formik */}
                {({ handleSubmit }: FormikProps<Partial<UserType>>) => (
                    <Form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email input field */}
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>이메일</Form.Label>
                            <Field
                                type="email"
                                name="email"
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
                        <hr />
                        {/* Submit button */}
                        <ButtonWrapper>
                            <Button
                                primary="true"
                                type="submit"
                                className="w-full"
                            >
                                로그인
                            </Button>
                        </ButtonWrapper>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
