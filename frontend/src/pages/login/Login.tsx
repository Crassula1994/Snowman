import { Form } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, Container } from "./loginStyles";
import { loginUser } from "@service/index.service";
import { UserType } from "@customTypes/userType";

export default function Login() {
    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
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
        setSubmitting(false);
    };

    return (
        <Container className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">로그인</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    회원가입 시 입력한 이메일과 비밀번호로 로그인하세요.
                </p>
            </div>
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
                        {/* Submit button */}
                        <Button primary="true" type="submit" className="w-full">
                            로그인
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
