'use client';

import CogoToast from '@successtar/cogo-toast';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { COMMON_ERROR_MESSAGE_CONSTANT } from '@/constant/message.constant';
import { useAppDispatch } from '@/store/hook';
import { setAuth } from '@/store/slice/auth.slice';
import {
    AUTH_ACCESS_TOKEN_NAME_CONSTANT,
    AUTH_USERNAME_NAME_CONSTANT,
} from '@/constant/auth.constant';

/**
 * ANCHOR Input
 * @date 9/10/2024 - 11:39:09 PM
 *
 * @typedef {Input}
 */
type Input = {
    username: string;
    password: string;
};

/**
 * ANCHOR Signin
 * @date 9/10/2024 - 11:34:24 PM
 *
 * @returns {*}
 */
const Signin = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [doing, setDoing] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>({
        defaultValues: {
            username: 'mojoe1',
            password: '12345678',
        },
    });

    /**
     * ANCHOR Submit
     * @date 9/10/2024 - 11:54:39 PM
     *
     * @async
     * @param {Input} payload
     * @returns {*}
     */
    const _submit = async (payload: Input) => {
        setDoing(true);

        try {
            const username: string = payload.username.trim();
            const password: string = payload.password;

            const { data } = await axios.post(`/auth/api/login`, {
                username,
                password,
            });

            sessionStorage.setItem(AUTH_USERNAME_NAME_CONSTANT, data.username);
            sessionStorage.setItem(
                AUTH_ACCESS_TOKEN_NAME_CONSTANT,
                data.accessToken,
            );

            dispatch(
                setAuth({
                    isAuthorized: true,
                    username: data.username,
                    accessToken: data.accessToken,
                }),
            );

            console.log(data);

            // const playlistId: string = data.id;

            // await fetch(playlistId);

            // CogoToast.success('Your playlist has been created successfully.');

            // setIsOpen(false);
        } catch (e) {
            if (
                e instanceof AxiosError &&
                e.response &&
                e.response.status &&
                e.response.status == 401
            ) {
                CogoToast.error(
                    'Your information is incorrect, please check and try again.',
                );
            } else {
                CogoToast.error(COMMON_ERROR_MESSAGE_CONSTANT);
            }
        } finally {
            setDoing(false);
        }
    };

    /**
     * ANCHOR Open
     * @date 9/10/2024 - 11:41:37 PM
     */
    const _open = () => {
        setIsOpen((isOpen) => {
            return !isOpen;
        });
    };

    return (
        <>
            <Button onClick={_open}>Sign In</Button>
            <Dialog
                size="xs"
                open={isOpen}
                handler={_open}
                className="bg-transparent shadow-none">
                <form onSubmit={handleSubmit(_submit)}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Sign In
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray">
                                Enter your username and password.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Your Username
                            </Typography>
                            <Input
                                {...register('username', {
                                    required: true,
                                    validate: (v) => !!v.trim(),
                                })}
                                label="Username"
                                size="lg"
                                autoFocus={true}
                                error={!!errors.username}
                            />
                            <Typography className="-mb-2" variant="h6">
                                Your Password
                            </Typography>
                            <Input
                                {...register('password', {
                                    required: true,
                                    validate: (v) => !!v,
                                })}
                                type="password"
                                label="Password"
                                size="lg"
                                error={!!errors.password}
                            />
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button
                                type="submit"
                                size="lg"
                                variant="gradient"
                                fullWidth={true}
                                loading={doing}>
                                Sign In
                            </Button>
                            <Typography
                                variant="small"
                                className="mt-4 flex justify-center">
                                Don&apos;t have an account?
                                <Typography
                                    as="a"
                                    href="#signup"
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold">
                                    Sign up
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    );
};

export default Signin;
