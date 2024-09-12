'use client';

import CogoToast from '@successtar/cogo-toast';
import classNames from 'classnames';
import { createElement, useState } from 'react';
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from '@material-tailwind/react';
import {
    ChevronDownIcon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setAuth } from '@/store/slice/auth.slice';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { axios } from '@/service/api.service';
import { usePathname, useRouter } from 'next/navigation';

/**
 * ANCHOR Profile Menu
 * @date 9/12/2024 - 6:37:56 PM
 *
 * @returns {*}
 */
const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const { username } = useAppSelector((state) => state.auth);

    /**
     * ANCHOR Sign out
     * @date 9/12/2024 - 4:16:27 AM
     *
     * @async
     * @returns {*}
     */
    const _signOut = async () => {
        setIsMenuOpen(false);

        try {
            await axios.post('/auth/api/signout');

            dispatch(
                setAuth({
                    isAuthorized: false,
                    username: null,
                }),
            );

            if (pathname != '/') {
                router.push('/');
            }
        } catch {
            CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
        }
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className={classNames({
                        'flex items-center gap-1 rounded-full py-0.5 pr-2 lg:ml-auto':
                            true,
                        'pl-0.5': !username,
                        'pl-3': !!username,
                    })}>
                    {username && (
                        <span className="font-semibold text-xs text-black mr-2">
                            @{username}
                        </span>
                    )}
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? 'rotate-180' : ''
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                <MenuItem
                    onClick={_signOut}
                    className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10">
                    {createElement(ArrowLeftStartOnRectangleIcon, {
                        className: 'w-5 h-5 text-red-500',
                        strokeWidth: 2,
                    })}
                    <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color="red">
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ProfileMenu;
