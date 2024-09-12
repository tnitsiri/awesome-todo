import {
    AUTH_ACCESS_TOKEN_COOKIE_NAME_CONSTANT,
    AUTH_APP_ACCESS_TOKEN_HEADER_NAME_CONSTANT,
    AUTH_APP_AUTHORIZED_HEADER_NAME_CONSTANT,
    AUTH_AUTHORIZED_COOKIE_NAME_CONSTANT,
} from '@/constant/auth.constant';
import { TodoModel } from '@/model/todo.model';
import { axios } from '@/service/api.service';
import { PageProps } from '@/type/common.type';
import { titleUtil } from '@/util/common.util';
import { Metadata } from 'next';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { cache } from 'react';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 6:45:41 AM
 *
 * @typedef {Props}
 */
type Props = {
    id: string;
};

/**
 * ANCHOR Get todo
 * @date 9/12/2024 - 6:44:09 AM
 *
 * @type {*}
 */
const getTodo = cache(async (id: string): Promise<TodoModel> => {
    let todo: TodoModel | null = null;

    try {
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
            // todo
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_APP_URL}/todo/api/${id}`,
                {
                    headers: {
                        [AUTH_APP_AUTHORIZED_HEADER_NAME_CONSTANT]:
                            authorized.value,
                        [AUTH_APP_ACCESS_TOKEN_HEADER_NAME_CONSTANT]:
                            accessToken.value,
                    },
                },
            );

            todo = data.todo;
        }
    } catch {}

    if (!todo) {
        notFound();
    }

    return todo;
});

/**
 * ANCHOR Generate Metadata
 * @date 9/12/2024 - 7:07:36 AM
 *
 * @export
 * @async
 * @param {PageProps<Props>} {
    params: { id },
}
 * @returns {Promise<Metadata>}
 */
export async function generateMetadata({
    params: { id },
}: PageProps<Props>): Promise<Metadata> {
    // todo
    const todo: TodoModel = await getTodo(id);

    // title
    const title: string = titleUtil(todo.title);

    return {
        title,
        description: todo.description,
    };
}

/**
 * ANCHOR Page
 * @date 9/12/2024 - 6:45:53 AM
 *
 * @async
 * @param {PageProps<Props>} { params }
 * @returns {unknown}
 */
const Page = async ({ params }: PageProps<Props>) => {
    // todo
    const todo: TodoModel = await getTodo(params.id);

    return (
        <main className="w-full max-w-full flex min-h-screen flex-col pt-10 pb-28 px-8">
            <div className="mx-auto max-w-screen-xl w-full pt-10">
                <div className="flex flex-col items-start">Todo Detail</div>
            </div>
        </main>
    );
};

export default Page;
