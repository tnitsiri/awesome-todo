'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import {
    AUTH_ACCESS_TOKEN_NAME_CONSTANT,
    AUTH_USERNAME_NAME_CONSTANT,
} from '@/constant/auth.constant';
import { setAuth } from '@/store/slice/auth.slice';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 1:41:48 AM
 *
 * @typedef {Props}
 */
type Props = {
    children: ReactNode;
};

/**
 * ANCHOR Root
 * @date 9/11/2024 - 1:41:53 AM
 *
 * @param {Props} { children }
 * @returns {*}
 */
const Root = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    /**
     * ANCHOR Init
     * @date 9/11/2024 - 1:42:06 AM
     *
     * @async
     * @returns {*}
     */
    const _init = async () => {
        const username: string | null = sessionStorage.getItem(
            AUTH_USERNAME_NAME_CONSTANT,
        );

        const accessToken: string | null = sessionStorage.getItem(
            AUTH_ACCESS_TOKEN_NAME_CONSTANT,
        );

        if (username && accessToken) {
            dispatch(
                setAuth({
                    isAuthorized: true,
                    username,
                    accessToken,
                }),
            );
        }
    };

    useEffect(() => {
        _init();
    }, []);

    return (
        <ThemeProvider>
            <>{children}</>
        </ThemeProvider>
    );
};

export default Root;
