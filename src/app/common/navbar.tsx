'use client';

import Link from 'next/link';
import classNames from 'classnames';
import Auth from '../auth/auth';
import CreateTodo from '../todo/form';
import ProfileMenu from './profile-menu';
import { Navbar as MtNavbar } from '@material-tailwind/react';
import { useAppSelector } from '@/store/hook';
import { FormModeEnum } from '@/enum/form.enum';

/**
 * ANCHOR Navbar
 * @date 9/12/2024 - 6:28:09 PM
 *
 * @returns {*}
 */
const Navbar = () => {
    const { isAuthorized } = useAppSelector((state) => state.auth);

    return (
        <div className="sticky top-10 z-50 mx-8">
            <MtNavbar
                className={classNames({
                    'mx-auto max-w-screen-xl p-2 rounded-full': true,
                    'md:pl-6': isAuthorized,
                    'pl-4 md:pl-6': !isAuthorized,
                })}>
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <div className="flex flex-row items-center">
                        <Link
                            href="/"
                            className={classNames({
                                'mr-6 ml-2 cursor-pointer py-1.5 font-medium uppercase':
                                    true,
                                'hidden md:flex': isAuthorized,
                            })}>
                            {process.env.NEXT_PUBLIC_BRAND}
                        </Link>
                        {isAuthorized && (
                            <CreateTodo mode={FormModeEnum.Create} />
                        )}
                    </div>
                    {!isAuthorized && <Auth />}
                    {isAuthorized && <ProfileMenu />}
                </div>
            </MtNavbar>
        </div>
    );
};

export default Navbar;
