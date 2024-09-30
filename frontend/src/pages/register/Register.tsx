import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../service/index.service";
import { UserType } from "@customTypes/userType";

export default function Register() {
    const [success, setSuccess] = useState("");

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
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
                <h1 className="text-3xl font-bold">회원가입</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    회원가입을 위해 필요한 정보를 입력하세요.
                </p>
            </div>
            <Formik
                initialValues={{ username: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }: FormikProps<UserType>) => (
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
                            </div>
                        )}
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>성명</Form.Label>
                            <Field
                                type="text"
                                name="username"
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>이메일</Form.Label>
                            <Field
                                type="email"
                                name="email"
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>비밀번호</Form.Label>
                            <Field
                                type="password"
                                name="password"
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type="invalid" />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full"
                        >
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
