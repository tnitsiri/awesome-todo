import axios, { AxiosError } from 'axios';

/**
 * ANCHOR Sign up
 * @date 9/12/2024 - 2:16:47 AM
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
            `${process.env.NEXT_PUBLIC_API_URL}/users`,
            {
                username,
                password,
            },
        );

        if (typeof data == 'object' && data.isSuccess === true && data.data) {
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
        }
    } catch (e) {
        if (
            e instanceof AxiosError &&
            e.response &&
            e.response.data &&
            typeof e.response.data == 'object'
        ) {
            const data: any = e.response.data;

            if (data.message) {
                return Response.json(
                    {
                        eMessage: data.message,
                    },
                    {
                        status: 500,
                    },
                );
            }
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
