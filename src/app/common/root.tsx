'use client';

import CogoToast from '@successtar/cogo-toast';
import { ThemeProvider } from '@material-tailwind/react';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';
import { setAuth } from '@/store/slice/auth.slice';
import { axios } from '@/service/api.service';
import { AxiosError } from 'axios';

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
     * ANCHOR Fetch me
     * @date 9/12/2024 - 3:45:24 AM
     *
     * @async
     * @returns {*}
     */
    const _fetchMe = async () => {
        try {
            const { data } = await axios.get('/auth/api/me');

            dispatch(
                setAuth({
                    isAuthorized: true,
                    username: data.username,
                }),
            );
        } catch (e) {
            if (
                !(
                    e instanceof AxiosError &&
                    e.response &&
                    e.response.status &&
                    e.response.status == 401
                )
            ) {
                CogoToast.error('Unable to fetch user information.');
            }
        }
    };

    useEffect(() => {
        _fetchMe();
    }, []);

    return (
        <ThemeProvider>
            <>{children}</>
        </ThemeProvider>
    );
};

export default Root;
