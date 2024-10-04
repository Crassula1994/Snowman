import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "@service/index.service";
import { UserType } from "@customTypes/userType";
import { NavLink } from "react-router-dom";
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

export default function Register() {
    const [success, setSuccess] = useState("");

    const validationSchema = Yup.object().shape({
        userId: Yup.string()
            .min(3, "아이디가 너무 짧습니다.")
            .max(15, "아이디가 너무 깁니다.")
            .required("아이디를 입력해야 합니다.")
            .matches(/^[a-z0-9]+$/, "아이디의 형식이 올바르지 않습니다."),
        userName: Yup.string()
            .min(2, "이름이 너무 짧습니다.")
            .max(15, "이름이 너무 깁니다.")
            .required("이름을 입력해야 합니다.")
            .matches(/^[가-힣]+$/, "이름의 형식이 올바르지 않습니다."),
        email: Yup.string()
            .email("유효하지 않은 이메일 주소입니다.")
            .required("이메일을 입력해야 합니다."),
        password: Yup.string()
            .min(8, "비밀번호가 너무 짧습니다.")
            .max(20, "비밀번호가 너무 깁니다.")
            .matches(
                /[A-Z]/,
                "비밀번호에 영어 대문자를 한 글자 이상 포함해야 합니다."
            )
            .matches(/\d/, "비밀번호에 숫자를 한 글자 이상 포함해야 합니다.")
            .matches(
                /[@$!%*?&]/,
                "비밀번호에 특수문자를 한 글자 이상 포함해야 합니다."
            )
            .required("비밀번호를 입력해야 합니다."),
    });

    const handleSubmit = async (
        values: UserType,
        { setSubmitting }: FormikHelpers<UserType>
    ) => {
        // Handle form submission
        const submit = await registerUser(values);
        console.log(submit.message);
        setSuccess(submit.message);
        setSubmitting(false);
    };

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <TitleWrapper>회원가입</TitleWrapper>
                <DescWrapper>
                    회원가입을 위해 필요한 정보를 입력하세요.
                </DescWrapper>
            </div>
            <hr />
            <Formik
                initialValues={{
                    userId: "",
                    userName: "",
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, errors, touched }: FormikProps<UserType>) => (
                    <Form className="space-y-4" onSubmit={handleSubmit}>
                        {success && (
                            <div
                                className="text-green-500 "
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    backgroundColor: "#f0f0f0",
                                    padding: "0.5rem",
                                    borderRadius: "0.5rem",
                                }}
                            >
                                {success}
                                <NavLink to="/">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-full"
                                    >
                                        홈으로
                                    </Button>
                                </NavLink>
                            </div>
                        )}
                        <Form.Group className="mb-3" controlId="user-id">
                            <Form.Label>
                                <b>아이디</b>: 영어 소문자 및 숫자로만 구성된 3
                                ~ 15글자의 아이디가 필요합니다.
                            </Form.Label>
                            <Field
                                type="text"
                                name="userId"
                                as={Form.Control}
                            />
                            {errors.userId && touched.userId ? (
                                <div>{errors.userId}</div>
                            ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="user-name">
                            <Form.Label>
                                <b>이름</b>: 한글로 된 2 ~ 15글자의 이름이
                                필요합니다.
                            </Form.Label>
                            <Field
                                type="text"
                                name="userName"
                                as={Form.Control}
                            />
                            {errors.userName && touched.userName ? (
                                <div>{errors.userName}</div>
                            ) : null}
                            {/* {errors.username && touched.username && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            )} */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>
                                <b>이메일</b>
                            </Form.Label>
                            <Field
                                type="email"
                                name="email"
                                as={Form.Control}
                            />
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>
                                <b>비밀번호</b>: 영어 대문자, 숫자, 특수문자를
                                포함하는 8글자 이상의 비밀번호가 필요합니다.
                            </Form.Label>
                            <Field
                                type="password"
                                name="password"
                                as={Form.Control}
                            />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <hr />
                        <ButtonWrapper>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-full"
                            >
                                회원가입
                            </Button>
                        </ButtonWrapper>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
