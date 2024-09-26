import Head from "next/head";
import TextButton from "@components/common/button";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push("/sign-in");
    };

    const handleSignUp = () => {
        router.push("/sign-up");
    };

    return (
        <>
            <Head>
                <title>스노우맨: Snowman</title>
                <meta
                    name="description"
                    content="당신의 엘사와 함께 눈사람을 만드세요."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="hero min-h-screen">
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">제목</h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="black"
                                className="h-4 w-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="black"
                                className="h-4 w-4 opacity-70"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <input
                                type="password"
                                className="grow"
                                value="password"
                            />
                        </label>
                        <TextButton
                            block
                            colorType={"neutral"}
                            onClick={handleSignIn}
                            text={"로그인"}
                        />
                        <TextButton
                            block
                            colorType={"neutral"}
                            onClick={handleSignUp}
                            text={"회원가입"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
