import { AUTH_ACCESS_TOKEN_HEADER_NAME_CONSTANT } from '@/constant/auth.constant';
import { axios } from '@/service/neversitup.service';

/**
 * ANCHOR Delete Params Type
 * @date 9/12/2024 - 5:42:13 AM
 *
 * @typedef {DeleteParamsType}
 */
type DeleteParamsType = {
    id: string;
};

/**
 * ANCHOR Remove
 * @date 9/12/2024 - 5:43:31 AM
 *
 * @export
 * @async
 * @param {Request} req
 * @param {{ params: DeleteParamsType }} context
 * @returns {unknown}
 */
export async function DELETE(
    req: Request,
    context: { params: DeleteParamsType },
) {
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
