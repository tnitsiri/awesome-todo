import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
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

    // access token
    const accessToken: RequestCookie | undefined = cookieStore.get(
        AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    );

    // authorized
    const authorized: RequestCookie | undefined = cookieStore.get(
        AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
    );

    if (accessToken && accessToken.value && authorized && authorized.value) {
        request.headers.set(
            AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
            accessToken.value,
        );

        return NextResponse.next({
            request,
        });
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
