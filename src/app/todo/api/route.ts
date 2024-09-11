import { AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT } from '@/constant/auth.constant';
import { TodoModel } from '@/model/todo.model';
import { axios } from '@/service/neversitup.service';
import { isISO8601 } from 'class-validator';

/**
 * ANCHOR List
 * @date 9/12/2024 - 2:12:31 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {unknown}
 */
export async function GET(req: Request) {
    // todo
    let todos: TodoModel[] = [];

    try {
        // todo list
        const { data } = await axios.get('todo', {
            headers: {
                Authorization: `Bearer ${req.headers.get(AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT)}`,
            },
        });

        console.log(data);
    } catch {
        return Response.json([], {
            status: 500,
        });
    }

    return Response.json({
        todos,
    });
}

/**
 * ANCHOR Create
 * @date 9/12/2024 - 2:12:42 AM
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
            'todo',
            {
                title,
                description,
                due_date,
                is_done: false,
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
