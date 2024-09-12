'use client';

import Link from 'next/link';
import Auth from '../auth/auth';
import CreateTodo from '../todo/form';
import ProfileMenu from './profile-menu';
import {
    MenuItem,
    Navbar as MtNavbar,
    Typography,
} from '@material-tailwind/react';
import { useAppSelector } from '@/store/hook';
import { FormModeEnum } from '@/enum/form.enum';
import { createElement } from 'react';
import { TableCellsIcon } from '@heroicons/react/24/solid';

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
            <MtNavbar className="mx-auto max-w-screen-xl p-2 rounded-full md:pl-6">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <div className="flex flex-row items-center">
                        <Link
                            href="/"
                            className="mr-6 ml-2 cursor-pointer py-1.5 font-medium uppercase hidden md:flex">
                            {process.env.NEXT_PUBLIC_BRAND}
                        </Link>
                        <Link
                            href="/table-plus"
                            className="sm:flex font-medium text-blue-gray-500 mr-1">
                            <span>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-medium text-blue-gray-500">
                                    <MenuItem className="flex items-center gap-2 rounded-full">
                                        {createElement(TableCellsIcon, {
                                            className: 'w-[22px] h-[22px]',
                                        })}{' '}
                                        <span className="hidden sm:flex text-gray-900">
                                            {' '}
                                            Table Plus
                                        </span>
                                    </MenuItem>
                                </Typography>
                            </span>
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
