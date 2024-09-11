import axios, { AxiosError } from 'axios';

/**
 * ANCHOR Sign in
 * @date 9/12/2024 - 2:16:34 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {unknown}
 */
export async function POST(req: Request) {
    // response
    let user: string | null = null;
    let accessToken: string | null = null;

    try {
        // payload
        const { username, password } = await req.json();

        if (!username || !password) {
            return Response.json([], {
                status: 400,
            });
        }

        // login
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
                username,
                password,
            },
        );

        if (data.username) {
            user = data.username;
        }

        if (data.access_token) {
            accessToken = data.access_token;
        }
    } catch (e) {
        if (
            e instanceof AxiosError &&
            e.response &&
            e.response.status &&
            e.response.status == 401
        ) {
            return Response.json([], {
                status: 401,
            });
        }
    }

    if (!user || !accessToken) {
        return Response.json([], {
            status: 500,
        });
    }

    return Response.json({
        username: user,
        accessToken,
    });
}
