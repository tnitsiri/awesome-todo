import axios from 'axios';
import { isISO8601 } from 'class-validator';

/**
 * ANCHOR Post
 * @date 9/12/2024 - 12:42:43 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {unknown}
 */
export async function POST(req: Request) {
    // response
    let isSuccess: boolean = false;

    try {
        // auth
        if (!req.headers.get('Authorization')) {
            return Response.json([], {
                status: 401,
            });
        }

        // payload
        const { title, description, due_date } = await req.json();

        if (!title || !description || !due_date || !isISO8601(due_date)) {
            return Response.json([], {
                status: 400,
            });
        }

        // create todo
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`,
            {
                title,
                description,
                due_date,
            },
            {
                headers: {
                    Authorization: req.headers.get('Authorization'),
                },
            },
        );

        if (typeof data == 'object' && data.isSuccess === true && data.data) {
            isSuccess = true;
        }
    } catch {}

    if (!isSuccess) {
        return Response.json([], {
            status: 500,
        });
    }

    return Response.json([]);
}
