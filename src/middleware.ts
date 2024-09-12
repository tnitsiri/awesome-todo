import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
    AUTH_APP_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
    AUTH_APP_AUTHORIZED_HEADER_NAME_CONSTANT,
    AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
} from './constant/auth.constant';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

/**
 * ANCHOR Config
 * @date 9/12/2024 - 2:42:00 AM
 *
 * @type {{ matcher: string; }}
 */
export const config = {
    matcher: ['/auth/api/me', '/todo/api/:path*'],
};

/**
 * ANCHOR Middleware
 * @date 9/12/2024 - 2:59:13 AM
 *
 * @export
 * @param {Request} request
 * @returns {*}
 */
export function middleware(request: Request) {
    // cookie store
    const cookieStore = cookies();

    // authorized
    const authorized: RequestCookie | undefined = cookieStore.get(
        AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
    );

    // access token
    const accessToken: RequestCookie | undefined = cookieStore.get(
        AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    );

    if (authorized && accessToken) {
        request.headers.set(
            AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
            accessToken.value,
        );

        return NextResponse.next({
            request,
        });
    } else {
        // authorized
        const authorized: string | null = request.headers.get(
            AUTH_APP_AUTHORIZED_HEADER_NAME_CONSTANT,
        );

        // access token
        const accessToken: string | null = request.headers.get(
            AUTH_APP_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
        );

        if (authorized && accessToken) {
            request.headers.set(
                AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
                accessToken,
            );

            return NextResponse.next({
                request,
            });
        }
    }

    return Response.json(
        {
            message: 'Unauthorized',
        },
        {
            status: 401,
        },
    );
}
