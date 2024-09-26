import { NextApiRequest, NextApiResponse } from "next";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        res.status(200).json({ message: "로그아웃 성공" });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
