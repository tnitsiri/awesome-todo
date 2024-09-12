import { AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT } from '@/constant/auth.constant';
import { TodoModel } from '@/model/todo.model';
import { axios } from '@/service/neversitup.service';
import { isISO8601 } from 'class-validator';

/**
 * ANCHOR List
 * @date 9/12/2024 - 4:39:00 AM
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

        if (typeof data == 'object' && data.isSuccess === true && data.data) {
            todos = data.data;
        }
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
 * @date 9/12/2024 - 4:39:06 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @returns {unknown}
 */
export async function POST(req: Request) {
    // response
    let id: string | null = null;

    try {
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
                    Authorization: `Bearer ${req.headers.get(AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT)}`,
                },
            },
        );

        if (typeof data == 'object' && data.isSuccess === true && data.data) {
            id = data.data.id;
        }
    } catch {}

    if (!id) {
        return Response.json([], {
            status: 500,
        });
    }

    return Response.json({
        id,
    });
}
