'use client';

import CogoToast from '@successtar/cogo-toast';
import nl2br from 'react-nl2br';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
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
import {
    AUTH_ACCESS_TOKEN_NAME_CONSTANT,
    AUTH_USERNAME_NAME_CONSTANT,
} from '@/constant/auth.constant';
import { setAuth } from '@/store/slice/auth.slice';
import { useAppDispatch } from '@/store/hook';

/**
 * ANCHOR Props
 * @date 9/11/2024 - 2:53:29 AM
 *
 * @typedef {Props}
 */
type Props = {
    openToken: string | null;
    signIn: () => void;
};

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
 * ANCHOR Signup
 * @date 9/11/2024 - 3:04:22 AM
 *
 * @param {Props} { openToken, signIn }
 * @returns {*}
 */
const Signup = ({ openToken, signIn }: Props) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [doing, setDoing] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>();

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

            const { data } = await axios.post('/auth/api/signup', {
                username,
                password,
            });

            CogoToast.success('User account created successfully.');

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
        } catch (e) {
            if (
                e instanceof AxiosError &&
                e.response &&
                e.response.data &&
                e.response.data.eMessage
            ) {
                CogoToast.error(
                    <div className="text-center">
                        {nl2br(e.response.data.eMessage)}
                    </div>,
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

    /**
     * ANCHOR Sign in
     * @date 9/11/2024 - 3:04:15 AM
     */
    const _signIn = () => {
        _open();
        signIn();
    };

    useEffect(() => {
        if (openToken) {
            _open();
        }
    }, [openToken]);

    return (
        <Dialog
            size="xs"
            open={isOpen}
            handler={_open}
            className="bg-transparent shadow-none">
            <form onSubmit={handleSubmit(_submit)}>
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Sign Up
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
                            Sign Up
                        </Button>
                        <Typography
                            variant="small"
                            className="mt-4 flex justify-center">
                            Already have an account?
                            <Typography
                                as="button"
                                type="button"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={_signIn}>
                                Sign in
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </form>
        </Dialog>
    );
};

export default Signup;
