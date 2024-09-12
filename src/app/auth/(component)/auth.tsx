'use client';

import Signin from './signin';
import Signup from './signup';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

/**
 * ANCHOR Auth
 * @date 9/11/2024 - 2:40:16 AM
 *
 * @returns {*}
 */
const Auth = () => {
    const [openSignInToken, setOpenSignInToken] = useState<string | null>(null);
    const [openSignUpToken, setOpenSignUpToken] = useState<string | null>(null);

    /**
     * ANCHOR Sign in
     * @date 9/11/2024 - 3:03:05 AM
     */
    const _signIn = () => {
        setOpenSignInToken(uuidv1());
    };

    /**
     * ANCHOR Sign up
     * @date 9/11/2024 - 2:50:56 AM
     */
    const _signUp = () => {
        setOpenSignUpToken(uuidv1());
    };

    return (
        <>
            <Signin openToken={openSignInToken} signUp={_signUp} />
            <Signup openToken={openSignUpToken} signIn={_signIn} />
        </>
    );
};

export default Auth;
