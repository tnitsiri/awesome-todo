import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
} from '@/constant/auth.constant';
import { AuthService } from '@/service/auth.service';
import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

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
    let authorized: string | null = null;

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
                // username
                user = data.username;
            }

            if (data.access_token) {
                // access token
                accessToken = data.access_token;

                // auth service
                const authService: AuthService = new AuthService();

                // payload
                const payload: string = JSON.stringify({
                    username,
                    accessToken,
                });

                // authorized
                authorized = authService.encrypt(payload);
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

    if (!user || !accessToken || !authorized) {
        return Response.json([], {
            status: 500,
        });
    }

    // response
    const response: NextResponse = NextResponse.json({
        username: user,
    });

    // access token
    response.cookies.set({
        name: AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
        value: accessToken,
        httpOnly: true,
    });

    // authorized
    response.cookies.set({
        name: AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
        value: authorized,
        httpOnly: true,
    });

    return response;
}
