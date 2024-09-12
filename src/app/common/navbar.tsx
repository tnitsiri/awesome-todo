'use client';

import Link from 'next/link';
import CogoToast from '@successtar/cogo-toast';
import classNames from 'classnames';
import Auth from '../auth/auth';
import CreateTodo from '../todo/form';
import React, { createElement, useState } from 'react';
import {
    Navbar as MtNavbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from '@material-tailwind/react';
import {
    UserCircleIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    RocketLaunchIcon,
    Bars2Icon,
    ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setAuth } from '@/store/slice/auth.slice';
import { FormModeEnum } from '@/enum/form.enum';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { axios } from '@/service/api.service';
import { usePathname, useRouter } from 'next/navigation';

/**
 * ANCHOR Profile Menu
 * @date 9/11/2024 - 2:13:24 AM
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

// nav list menu
const navListMenuItems = [
    {
        title: '@material-tailwind/html',
        description:
            'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
    },
    {
        title: '@material-tailwind/react',
        description:
            'Learn how to use @material-tailwind/react, packed with rich components for React.',
    },
    {
        title: 'Material Tailwind PRO',
        description:
            'A complete set of UI Elements for building faster websites in less time.',
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const renderItems = navListMenuItems.map(({ title, description }) => (
        <a href="#" key={title}>
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal">
                    {description}
                </Typography>
            </MenuItem>
        </a>
    ));

    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography
                        as="a"
                        href="#"
                        variant="small"
                        className="font-normal">
                        <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
                            <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{' '}
                            Pages{' '}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${
                                    isMenuOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md">
                        <RocketLaunchIcon
                            strokeWidth={1}
                            className="h-28 w-28"
                        />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{' '}
                Pages{' '}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: 'Account',
        icon: UserCircleIcon,
    },
    // {
    //     label: 'Blocks',
    //     icon: CubeTransparentIcon,
    // },
    // {
    //     label: 'Docs',
    //     icon: CodeBracketSquareIcon,
    // },
];

function NavList() {
    const { isAuthorized } = useAppSelector((state) => state.auth);

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500">
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {
                            className: 'h-[18px] w-[18px]',
                        })}{' '}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
            {isAuthorized && <CreateTodo mode={FormModeEnum.Create} />}
        </ul>
    );
}

export function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    const { isAuthorized } = useAppSelector((state) => state.auth);

    React.useEffect(() => {
        window.addEventListener(
            'resize',
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <div className="sticky top-10 z-50">
            <MtNavbar className="mx-auto max-w-screen-xl p-2 rounded-full pl-6">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <Link
                        href="/"
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium uppercase">
                        {process.env.NEXT_PUBLIC_BRAND}
                    </Link>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden">
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>
                    {!isAuthorized && <Auth />}
                    {isAuthorized && <ProfileMenu />}
                </div>
                {/* <MobileNav open={isNavOpen} className="overflow-scroll">
                    <NavList />
                </MobileNav> */}
            </MtNavbar>
        </div>
    );
}

const Navbar = () => {
    return <ComplexNavbar />;
};

export default Navbar;
