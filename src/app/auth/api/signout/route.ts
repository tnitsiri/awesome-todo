import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
} from '@/constant/auth.constant';
import { NextResponse } from 'next/server';

/**
 * ANCHOR Sign out
 * @date 9/12/2024 - 4:18:24 AM
 *
 * @export
 * @async
 * @returns {unknown}
 */
export async function POST() {
    // response
    const response: NextResponse = NextResponse.json([]);

    // access token
    response.cookies.delete({
        name: AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    });

    // authorized
    response.cookies.delete({
        name: AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
    });

    return response;
}
