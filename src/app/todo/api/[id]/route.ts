import { AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT } from '@/constant/auth.constant';
import { TodoModel } from '@/model/todo.model';
import { axios } from '@/service/neversitup.service';
import { isISO8601 } from 'class-validator';

/**
 * ANCHOR Params Type
 * @date 9/12/2024 - 6:03:13 AM
 *
 * @typedef {ParamsType}
 */
type ParamsType = {
    id: string;
};

/**
 * ANCHOR Info
 * @date 9/12/2024 - 7:03:27 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @param {{ params: ParamsType }} context
 * @returns {unknown}
 */
export async function GET(req: Request, context: { params: ParamsType }) {
    // response
    let todo: TodoModel | null = null;

    try {
        // todo info
        const { data } = await axios.get(`todo/${context.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.headers.get(AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT)}`,
            },
        });

        if (typeof data == 'object' && data.isSuccess === true && data.data) {
            todo = data.data;
        }
    } catch {}

    if (!todo) {
        return Response.json([], {
            status: 404,
        });
    }

    return Response.json({
        todo,
    });
}

/**
 * ANCHOR Done
 * @date 9/12/2024 - 8:18:21 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @param {{ params: ParamsType }} context
 * @returns {unknown}
 */
export async function PUT(req: Request, context: { params: ParamsType }) {
    // response
    let isSuccess: boolean = false;

    try {
        // payload
        const { isDone } = await req.json();

        if (typeof isDone != 'boolean') {
            return Response.json([], {
                status: 400,
            });
        }

        // update todo
        const { data } = await axios.patch(
            `todo/${context.params.id}`,
            {
                is_done: isDone,
            },
            {
                headers: {
                    Authorization: `Bearer ${req.headers.get(AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT)}`,
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

/**
 * ANCHOR Update
 * @date 9/12/2024 - 6:05:36 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @param {{ params: ParamsType }} context
 * @returns {unknown}
 */
export async function PATCH(req: Request, context: { params: ParamsType }) {
    // response
    let isSuccess: boolean = false;

    try {
        // payload
        const { title, description, due_date } = await req.json();

        if (!title || !description || !due_date || !isISO8601(due_date)) {
            return Response.json([], {
                status: 400,
            });
        }

        // update todo
        const { data } = await axios.patch(
            `todo/${context.params.id}`,
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

/**
 * ANCHOR Remove
 * @date 9/12/2024 - 6:03:24 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @param {{ params: ParamsType }} context
 * @returns {unknown}
 */
export async function DELETE(req: Request, context: { params: ParamsType }) {
    // response
    let isSuccess: boolean = false;

    try {
        // remove todo
        const { data } = await axios.delete(`todo/${context.params.id}`, {
            headers: {
                Authorization: `Bearer ${req.headers.get(AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT)}`,
            },
        });

        if (typeof data == 'object' && data.isSuccess === true) {
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
