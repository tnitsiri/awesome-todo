import { AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT } from '@/constant/auth.constant';
import { AuthService } from '@/service/auth.service';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

/**
 * ANCHOR Me
 * @date 9/12/2024 - 4:15:24 AM
 *
 * @export
 * @async
 * @returns {unknown}
 */
export async function GET() {
    // response
    let username: string | null = null;

    try {
        // cookie store
        const cookieStore = cookies();

        // authorized
        const authorized: RequestCookie | undefined = cookieStore.get(
            AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
        );

        if (authorized) {
            // auth service
            const authService: AuthService = new AuthService();

            // payload
            const payload: string = authService.decrypt(authorized.value);

            // info
            const info: any = JSON.parse(payload);

            if (info.username && info.accessToken) {
                username = info.username;
            }
        }
    } catch {}

    if (!username) {
        return Response.json([], {
            status: 401,
        });
    }

    return Response.json({
        username,
    });
}
