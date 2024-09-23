import { NextRequest, NextResponse } from "next/server";

const middeleWare = async (req: NextRequest) => {
    const token: string = req.cookies.get("token")?.value!;

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    try {
        const response = await fetch("http://localhost:3060/api/validate", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        const data = await response.json();

        if (data.message === "token is valid") {
            const userinfo = data.user;
            const res = NextResponse.next();
            res.cookies.set("user",
                JSON.stringify(userinfo), {
                httpOnly: false,
                path: "/"
            });
            return res
        } else {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    } catch (error) {
        console.error("Error validating token:", error);
        return NextResponse.redirect(new URL('/signin', req.url));
    }
};

export const config ={
    matcher: ['/user/:path*'],
}
export default middeleWare


